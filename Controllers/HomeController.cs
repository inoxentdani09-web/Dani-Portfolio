using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Models;
using Portfolio.Models.ViewModels;

namespace Portfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly PortfolioDbContext _context;
        private readonly ILogger<HomeController> _logger;

        public HomeController(PortfolioDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: / (Main Portfolio Website)
        [HttpGet]
        public async Task<IActionResult> Index([FromQuery] string? sent)
        {
            try
            {
                var admin = await _context.Admins.FirstOrDefaultAsync() ?? new Admin();
                var settings = await _context.Settings.FirstOrDefaultAsync() ?? new Settings();

                var skills = await _context.Skills
    .OrderBy(s => s.CategoryId)
    .ThenBy(s => s.Name)
    .ToListAsync();

                var projects = await _context.Projects
                    .Where(p => p.Status == "Published")
                    .OrderByDescending(p => p.IsFeatured)
                    .ThenByDescending(p => p.CreatedAt)
                    .ToListAsync();

                var courses = await _context.Courses
    .OrderByDescending(c => c.CreatedAt)
    .ToListAsync();

                var viewModel = new HomeViewModel
                {
                    Admin = admin,
                    Settings = settings,
                    Skills = skills,
                    Projects = projects,
                    Courses = courses,
                    TotalProjects = projects.Count,
                    TotalSkills = skills.Count,
                    TotalCourses = courses.Count,
                    MessageSuccess = (sent == "true")
                        ? "Thank you! Your message has been received successfully. I will get back to you shortly."
                        : null
                };

                ViewData["Title"] = $"{admin.Name} | {admin.Title}";
                return View(viewModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching portfolio data from SQL Server.");
                return View(new HomeViewModel());
            }
        }

        // POST: /Home/SendMessage (or /send-message)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SendMessage([FromForm] Message model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.Name) || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.MessageText))
                {
                    if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                    {
                        return Json(new { success = false, message = "Please fill in all required fields (Name, Email, Message)." });
                    }
                    return RedirectToAction(nameof(Index), new { fragment = "Contact" });
                }

                model.SentAt = DateTime.UtcNow;
                model.IsRead = false;
                if (string.IsNullOrWhiteSpace(model.Subject))
                {
                    model.Subject = "New Website Contact Inquiry";
                }

                _context.Messages.Add(model);
                await _context.SaveChangesAsync();

                if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    return Json(new
                    {
                        success = true,
                        message = "Message submitted successfully! Thank you for reaching out.",
                        messageId = model.MessageID
                    });
                }

                return RedirectToAction(nameof(Index), new { sent = "true" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving contact message to SQL Server.");
                if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    return StatusCode(500, new { success = false, message = "Database error saving message. Please try again." });
                }
                return RedirectToAction(nameof(Index));
            }
        }

        // POST: /Home/EnrollCourse (or /api/enroll)
        [HttpPost]
        public async Task<IActionResult> EnrollCourse([FromForm] CourseEnrollment model, [FromForm] IFormFile? proofFile)
        {
            try
            {
                if (model.CourseID <= 0 || string.IsNullOrWhiteSpace(model.StudentName) || string.IsNullOrWhiteSpace(model.StudentEmail))
                {
                    return Json(new { success = false, message = "Please select a course and provide your name and email." });
                }

                var course = await _context.Courses.FindAsync(model.CourseID);
                if (course == null)
                {
                    return Json(new { success = false, message = "Selected course not found." });
                }

                model.CourseTitle = course.Title;
                model.EnrolledAt = DateTime.UtcNow;

                // Handle file upload if provided
                if (proofFile != null && proofFile.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images");
                    if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(proofFile.FileName);
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await proofFile.CopyToAsync(fileStream);
                    }
                    model.ScreenshotProof = uniqueFileName;
                }

                // If course is free, approve immediately
                if (course.PriceType?.ToLower() == "free" || course.Price?.ToLower() == "free")
                {
                    model.Status = "Approved";
                    model.AccessCode = "FREE-" + Guid.NewGuid().ToString().Substring(0, 8).ToUpper();
                }
                else
                {
                    model.Status = "Pending";
                    model.AccessCode = "TRX-" + (model.TransactionId ?? Guid.NewGuid().ToString().Substring(0, 8).ToUpper());
                }

                _context.CourseEnrollments.Add(model);

                // Increment enrolled count
                course.EnrolledStudents += 1;
                _context.Courses.Update(course);

                await _context.SaveChangesAsync();

                return Json(new
                {
                    success = true,
                    message = model.Status == "Approved"
                        ? "Free access granted! You can begin learning immediately."
                        : "Enrollment application submitted to Daniyal Khan! Your access will be approved after payment confirmation.",
                    enrollment = model
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing course enrollment.");
                return StatusCode(500, new { success = false, message = "Internal error processing enrollment." });
            }
        }

        // GET: /Home/CheckEnrollment
        [HttpGet]
        public async Task<IActionResult> CheckEnrollment([FromQuery] string? query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Json(new { success = false, message = "Please enter your Email or Transaction ID." });
            }

            var q = query.Trim().ToLower();
            var enrollments = await _context.CourseEnrollments
                .Include(e => e.Course)
                .Where(e => e.StudentEmail.ToLower() == q || (e.TransactionId != null && e.TransactionId.ToLower() == q))
                .OrderByDescending(e => e.EnrolledAt)
                .ToListAsync();

            return Json(new { success = true, enrollments });
        }

        // GET: /Home/GetCourseDetails
        [HttpGet]
        public async Task<IActionResult> GetCourseDetails([FromQuery] int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return NotFound(new { success = false, message = "Course not found" });
            return Json(new { success = true, course });
        }
    }
}
