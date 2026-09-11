
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Models;
using Portfolio.Models.ViewModels;
using System.Text;

namespace Portfolio.Controllers
{
    public class AdminController : Controller
    {
        private readonly PortfolioDbContext _context;
        private readonly ILogger<AdminController> _logger;

        public AdminController(
            PortfolioDbContext context,
            ILogger<AdminController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // =========================================================
        // AUTHENTICATION
        // =========================================================

        private bool IsAuthenticated()
        {
            var session =
                HttpContext.Session.GetString("AdminUser");

            if (!string.IsNullOrEmpty(session))
                return true;

            if (Request.Cookies.TryGetValue(
                "admin_session",
                out var cookieVal) &&
                cookieVal == "authenticated")
            {
                return true;
            }

            return false;
        }


        // =========================================================
        // LOGIN
        // =========================================================

        [HttpGet]
        public async Task<IActionResult> Login(
            [FromQuery] string? logged_out)
        {
            if (logged_out == "true")
            {
                HttpContext.Session.Remove("AdminUser");
                Response.Cookies.Delete("admin_session");
            }
            else if (IsAuthenticated())
            {
                return RedirectToAction(nameof(Dashboard));
            }

            var admin =
                await _context.Admins.FirstOrDefaultAsync()
                ?? new Admin();

            return View(
                new LoginViewModel
                {
                    Email = admin.Email
                });
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(
            [FromForm] LoginViewModel model)
        {
            var admin =
                await _context.Admins.FirstOrDefaultAsync(
                    a =>
                        a.Email.ToLower() ==
                        model.Email.ToLower() &&
                        a.Password == model.Password);

            bool isAjax =
                Request.Headers["X-Requested-With"] ==
                "XMLHttpRequest";

            if (admin != null)
            {
                HttpContext.Session.SetString(
                    "AdminUser",
                    admin.Email);

                var cookieOptions =
                    new CookieOptions
                    {
                        Expires =
                            model.Remember
                                ? DateTimeOffset.UtcNow.AddDays(30)
                                : DateTimeOffset.UtcNow.AddHours(24),

                        HttpOnly = true,
                        SameSite = SameSiteMode.Lax
                    };

                Response.Cookies.Append(
                    "admin_session",
                    "authenticated",
                    cookieOptions);

                if (isAjax)
                {
                    return Json(
                        new
                        {
                            success = true,
                            redirect = "/Admin/Dashboard"
                        });
                }

                return RedirectToAction(
                    nameof(Dashboard));
            }

            model.ErrorMessage =
                "Invalid email or password. Default: admin@gmail.com / admin1234";

            if (isAjax)
            {
                return BadRequest(
                    new
                    {
                        success = false,
                        message = model.ErrorMessage
                    });
            }

            return View(model);
        }


        // =========================================================
        // LOGOUT
        // =========================================================

        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("AdminUser");

            Response.Cookies.Delete(
                "admin_session");

            return RedirectToAction(
                nameof(Login),
                new
                {
                    logged_out = "true"
                });
        }


        // =========================================================
        // DASHBOARD
        // =========================================================

        [HttpGet]
        public async Task<IActionResult> Dashboard(
            [FromQuery] string? tab)
        {
            if (!IsAuthenticated())
                return RedirectToAction(nameof(Login));

            var admin =
                await _context.Admins.FirstOrDefaultAsync()
                ?? new Admin();

            var settings =
                await _context.Settings.FirstOrDefaultAsync()
                ?? new Settings();

            var projects =
                await _context.Projects
                    .OrderByDescending(
                        p => p.CreatedAt)
                    .ToListAsync();

            var skills =
                await _context.Skills
                    .OrderBy(s => s.CategoryId)
                    .ThenBy(s => s.Name)
                    .ToListAsync();

            var courses =
                await _context.Courses
                    .OrderByDescending(
                        c => c.CreatedAt)
                    .ToListAsync();

            var messages =
                await _context.Messages
                    .OrderByDescending(
                        m => m.SentAt)
                    .ToListAsync();

            var enrollments =
                await _context.CourseEnrollments
                    .OrderByDescending(
                        e => e.EnrolledAt)
                    .ToListAsync();

            var activeTab =
                string.IsNullOrEmpty(tab)
                    ? "dashboard"
                    : tab.ToLower();

            string activeTitle =
                activeTab switch
                {
                    "projects" =>
                        "Projects Management",

                    "skills" =>
                        "Skills Management",

                    "courses" =>
                        "Courses & Certifications",

                    "messages" =>
                        "Client Inquiries",

                    "enrollments" =>
                        "Course Enrollments",

                    "settings" =>
                        "Settings & Profile",

                    _ =>
                        "Dashboard Overview"
                };

            var viewModel =
                new AdminDashboardViewModel
                {
                    Admin = admin,
                    Settings = settings,
                    Projects = projects,
                    Skills = skills,
                    Courses = courses,
                    Messages = messages,
                    Enrollments = enrollments,
                    ActiveTab = activeTab,
                    ActiveTitle = activeTitle
                };

            return View(viewModel);
        }


        // =========================================================
        // PROJECTS
        // =========================================================

        [HttpGet]
        public IActionResult Projects()
        {
            return RedirectToAction(
                nameof(Dashboard),
                new
                {
                    tab = "projects"
                });
        }


        [HttpPost]
        public async Task<IActionResult> AddProject(
            [FromForm] Project model,
            [FromForm] IFormFile? imageFile)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            if (imageFile != null &&
                imageFile.Length > 0)
            {
                var uploadsFolder =
                    Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        "Images");

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName =
                    Guid.NewGuid().ToString() +
                    Path.GetExtension(
                        imageFile.FileName);

                var filePath =
                    Path.Combine(
                        uploadsFolder,
                        fileName);

                using var stream =
                    new FileStream(
                        filePath,
                        FileMode.Create);

                await imageFile.CopyToAsync(stream);

                model.Image = fileName;
            }
            else if (string.IsNullOrEmpty(model.Image))
            {
                model.Image = "Project-bg.jpeg";
            }

            model.CreatedAt =
                DateTime.UtcNow;

            _context.Projects.Add(model);

            await _context.SaveChangesAsync();

            return Json(
                new
                {
                    success = true,
                    message = "Project added successfully!",
                    project = model
                });
        }


        [HttpPost]
        public async Task<IActionResult> EditProject(
            [FromForm] Project model,
            [FromForm] IFormFile? imageFile)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var existing =
                await _context.Projects
                    .FindAsync(model.ProjectID);

            if (existing == null)
            {
                return NotFound(
                    new
                    {
                        success = false,
                        message = "Project not found."
                    });
            }

            existing.Title =
                model.Title;

            existing.Category =
                model.Category;

            existing.Description =
                model.Description;

            existing.LiveDemo =
                model.LiveDemo;

            existing.GitHub =
                model.GitHub;

            existing.Technalogy =
                model.Technalogy;

            existing.Status =
                model.Status ?? "Published";

            existing.IsFeatured =
                model.IsFeatured;

            if (imageFile != null &&
                imageFile.Length > 0)
            {
                var uploadsFolder =
                    Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        "Images");

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName =
                    Guid.NewGuid().ToString() +
                    Path.GetExtension(
                        imageFile.FileName);

                var filePath =
                    Path.Combine(
                        uploadsFolder,
                        fileName);

                using var stream =
                    new FileStream(
                        filePath,
                        FileMode.Create);

                await imageFile.CopyToAsync(stream);

                existing.Image =
                    fileName;
            }

            await _context.SaveChangesAsync();

            return Json(
                new
                {
                    success = true,
                    message = "Project updated successfully!"
                });
        }


        [HttpPost]
        public async Task<IActionResult> DeleteProject(
            int id)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var project =
                await _context.Projects.FindAsync(id);

            if (project != null)
            {
                _context.Projects.Remove(project);

                await _context.SaveChangesAsync();
            }

            return Json(
                new
                {
                    success = true,
                    message = "Project deleted successfully."
                });
        }


        // =========================================================
        // SKILLS
        // =========================================================

        [HttpGet]
        public IActionResult Skill()
        {
            return RedirectToAction(
                nameof(Dashboard),
                new
                {
                    tab = "skills"
                });
        }


        [HttpPost]
        public async Task<IActionResult> AddSkill(
            [FromForm] Skill model,
            [FromForm] IFormFile? iconFile)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            if (iconFile != null &&
                iconFile.Length > 0)
            {
                var uploadsFolder =
                    Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        "Images");

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName =
                    Guid.NewGuid().ToString() +
                    Path.GetExtension(
                        iconFile.FileName);

                var filePath =
                    Path.Combine(
                        uploadsFolder,
                        fileName);

                using var stream =
                    new FileStream(
                        filePath,
                        FileMode.Create);

                await iconFile.CopyToAsync(stream);

                model.Icon =
                    fileName;
            }
            else if (string.IsNullOrEmpty(model.Icon))
            {
                model.Icon = "HTML.png";
            }

            model.CreateDate =
                DateTime.UtcNow;

            _context.Skills.Add(model);

            await _context.SaveChangesAsync();

            return Json(
                new
                {
                    success = true,
                    message = "Skill added successfully!",
                    skill = model
                });
        }


        [HttpPost]
        public async Task<IActionResult> DeleteSkill(
            int id)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var skill =
                await _context.Skills.FindAsync(id);

            if (skill != null)
            {
                _context.Skills.Remove(skill);

                await _context.SaveChangesAsync();
            }

            return Json(
                new
                {
                    success = true,
                    message = "Skill deleted successfully."
                });
        }


        // =========================================================
        // COURSES
        // =========================================================

        [HttpGet]
        public IActionResult Course()
        {
            return RedirectToAction(
                nameof(Dashboard),
                new
                {
                    tab = "courses"
                });
        }


        // =========================================================
        // SAVE COURSE
        // ADD + EDIT
        // =========================================================

        [HttpPost]
        public async Task<IActionResult> SaveCourse(
            [FromForm] Course model)
        {
            if (!IsAuthenticated())
            {
                return Unauthorized(
                    new
                    {
                        success = false,
                        message = "Unauthorized"
                    });
            }


            // =====================================================
            // DEFAULT VALUES
            // =====================================================

            model.Title ??= string.Empty;
            model.Subtitle ??= string.Empty;
            model.Description ??= string.Empty;

            model.Category ??= "Backend";

            model.PriceType ??= "paid";
            model.Price ??= "PKR 3,500";
            model.OriginalPrice ??= "PKR 6,000";

            model.Duration ??= "8 Weeks";
            model.Level ??= "All Levels";
            model.LecturesCount ??= "36 Lectures";

            model.Language ??= "Urdu / Hindi";

            // IMPORTANT:
            // SQL Server Courses.Platform is NOT NULL
            model.Platform ??= "Online";

            model.Status ??= "Published";

            model.VideoUrl ??=
                "https://www.youtube.com";

            model.Syllabus ??= string.Empty;


            // =====================================================
            // VALIDATION
            // =====================================================

            if (string.IsNullOrWhiteSpace(
                model.Title))
            {
                return BadRequest(
                    new
                    {
                        success = false,
                        message =
                            "Course Title is required."
                    });
            }

            if (string.IsNullOrWhiteSpace(
                model.Category))
            {
                return BadRequest(
                    new
                    {
                        success = false,
                        message =
                            "Category is required."
                    });
            }

            if (string.IsNullOrWhiteSpace(
                model.Duration))
            {
                return BadRequest(
                    new
                    {
                        success = false,
                        message =
                            "Duration is required."
                    });
            }


            // =====================================================
            // ADD NEW COURSE
            // =====================================================

            if (model.CourseID == 0)
            {
                model.CreatedAt =
                    DateTime.UtcNow;

                if (string.IsNullOrWhiteSpace(
                    model.Platform))
                {
                    model.Platform =
                        "Online";
                }

                if (string.IsNullOrWhiteSpace(
                    model.Status))
                {
                    model.Status =
                        "Published";
                }

                _context.Courses.Add(model);
            }


            // =====================================================
            // EDIT EXISTING COURSE
            // =====================================================

            else
            {
                var existing =
                    await _context.Courses
                        .FirstOrDefaultAsync(
                            c =>
                                c.CourseID ==
                                model.CourseID);

                if (existing == null)
                {
                    return NotFound(
                        new
                        {
                            success = false,
                            message =
                                "Course not found."
                        });
                }


                existing.Title =
                    model.Title;

                existing.Subtitle =
                    model.Subtitle;

                existing.Description =
                    model.Description;

                existing.Category =
                    model.Category;

                existing.PriceType =
                    model.PriceType;

                existing.Price =
                    model.Price;

                existing.OriginalPrice =
                    model.OriginalPrice;

                existing.Duration =
                    model.Duration;

                existing.Level =
                    model.Level;

                existing.LecturesCount =
                    model.LecturesCount;

                existing.Language =
                    model.Language;


                // IMPORTANT FIX
                existing.Platform =
                    string.IsNullOrWhiteSpace(
                        model.Platform)
                        ? "Online"
                        : model.Platform;


                existing.Rating =
                    model.Rating;

                existing.EnrolledStudents =
                    model.EnrolledStudents;

                existing.Status =
                    string.IsNullOrWhiteSpace(
                        model.Status)
                        ? "Published"
                        : model.Status;

                existing.VideoUrl =
                    model.VideoUrl ??
                    string.Empty;

                existing.Syllabus =
                    model.Syllabus ??
                    string.Empty;

                // CreatedAt unchanged
            }


            // =====================================================
            // SAVE SQL SERVER
            // =====================================================

            await _context.SaveChangesAsync();


            // =====================================================
            // BACK TO COURSES
            // =====================================================

            return RedirectToAction(
                nameof(Dashboard),
                new
                {
                    tab = "courses"
                });
        }


        // =========================================================
        // GET COURSE DETAILS
        // =========================================================

        [HttpGet]
        public async Task<IActionResult> GetCourseDetails(
            [FromQuery] int id)
        {
            if (!IsAuthenticated())
            {
                return Unauthorized(
                    new
                    {
                        success = false,
                        message = "Unauthorized"
                    });
            }

            var course =
                await _context.Courses
                    .AsNoTracking()
                    .FirstOrDefaultAsync(
                        c =>
                            c.CourseID == id);

            if (course == null)
            {
                return NotFound(
                    new
                    {
                        success = false,
                        message =
                            "Course not found."
                    });
            }

            return Json(
                new
                {
                    success = true,
                    course = course
                });
        }


        // =========================================================
        // DELETE COURSE
        // =========================================================

        [HttpPost]
        public async Task<IActionResult> DeleteCourse(
            int id)
        {
            if (!IsAuthenticated())
            {
                return Unauthorized(
                    new
                    {
                        success = false,
                        message = "Unauthorized"
                    });
            }

            var course =
                await _context.Courses
                    .FirstOrDefaultAsync(
                        c =>
                            c.CourseID == id);

            if (course == null)
            {
                return NotFound(
                    new
                    {
                        success = false,
                        message =
                            "Course not found."
                    });
            }

            _context.Courses.Remove(course);

            await _context.SaveChangesAsync();

            return Json(
                new
                {
                    success = true,
                    message =
                        "Course deleted successfully."
                });
        }


        // =========================================================
        // ENROLLMENTS
        // =========================================================

        [HttpGet]
        public IActionResult Enrollments()
        {
            return RedirectToAction(
                nameof(Dashboard),
                new
                {
                    tab = "enrollments"
                });
        }


        [HttpPost]
        public async Task<IActionResult>
            UpdateEnrollmentStatus(
                int id,
                string status)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var enrollment =
                await _context.CourseEnrollments
                    .FindAsync(id);

            if (enrollment == null)
            {
                return NotFound(
                    new
                    {
                        success = false,
                        message =
                            "Enrollment not found."
                    });
            }

            enrollment.Status =
                status;

            await _context.SaveChangesAsync();

            return Json(
                new
                {
                    success = true,
                    message =
                        $"Status updated to {status}."
                });
        }


        [HttpGet]
        public async Task<IActionResult>
            ExportEnrollments()
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var enrollments =
                await _context.CourseEnrollments
                    .OrderByDescending(
                        e => e.EnrolledAt)
                    .ToListAsync();

            var csv =
                new StringBuilder();

            csv.AppendLine(
                "ID,Course,StudentName,Email,Phone,PaymentMethod,TransactionID,Status,Date");

            foreach (var e in enrollments)
            {
                csv.AppendLine(
                    $"{e.EnrollmentID}," +
                    $"\"{e.CourseTitle}\"," +
                    $"\"{e.StudentName}\"," +
                    $"\"{e.StudentEmail}\"," +
                    $"\"{e.StudentPhone}\"," +
                    $"\"{e.PaymentMethod}\"," +
                    $"\"{e.TransactionId}\"," +
                    $"\"{e.Status}\"," +
                    $"\"{e.EnrolledAt:yyyy-MM-dd HH:mm}\"");
            }

            var bytes =
                Encoding.UTF8.GetBytes(
                    csv.ToString());

            return File(
                bytes,
                "text/csv",
                $"Enrollments_{DateTime.UtcNow:yyyyMMdd}.csv");
        }


        // =========================================================
        // MESSAGES
        // =========================================================

        [HttpGet]
        public IActionResult Message()
        {
            return RedirectToAction(
                nameof(Dashboard),
                new
                {
                    tab = "messages"
                });
        }


        [HttpPost]
        public async Task<IActionResult>
            MarkMessageAsRead(int id)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var msg =
                await _context.Messages
                    .FindAsync(id);

            if (msg != null)
            {
                msg.IsRead = true;

                await _context.SaveChangesAsync();
            }

            return Json(
                new
                {
                    success = true,
                    message =
                        "Message marked as read."
                });
        }


        [HttpPost]
        public async Task<IActionResult>
            DeleteMessage(int id)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var msg =
                await _context.Messages
                    .FindAsync(id);

            if (msg != null)
            {
                _context.Messages.Remove(msg);

                await _context.SaveChangesAsync();
            }

            return Json(
                new
                {
                    success = true,
                    message =
                        "Message deleted successfully."
                });
        }


        // =========================================================
        // SETTINGS
        // =========================================================

        [HttpGet]
        public IActionResult Settings()
        {
            return RedirectToAction(
                nameof(Dashboard),
                new
                {
                    tab = "settings"
                });
        }


        [HttpPost]
        public async Task<IActionResult>
            UpdateSettings(
                [FromForm] Settings model)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var settings =
                await _context.Settings
                    .FirstOrDefaultAsync();

            if (settings != null)
            {
                settings.SiteTitle =
                    model.SiteTitle;

                settings.Tagline =
                    model.Tagline;

                settings.HeroHeading =
                    model.HeroHeading;

                settings.HeroSubheading =
                    model.HeroSubheading;

                settings.HeroDescription =
                    model.HeroDescription;

                settings.AboutHeading =
                    model.AboutHeading;

                settings.AboutDescription =
                    model.AboutDescription;

                settings.Email =
                    model.Email;

                settings.Phone =
                    model.Phone;

                settings.Location =
                    model.Location;

                settings.WorkingHours =
                    model.WorkingHours;

                settings.JazzCashNumber =
                    model.JazzCashNumber;

                settings.JazzCashTitle =
                    model.JazzCashTitle;

                settings.EasyPaisaNumber =
                    model.EasyPaisaNumber;

                settings.EasyPaisaTitle =
                    model.EasyPaisaTitle;

                settings.BankName =
                    model.BankName;

                settings.BankAccountNumber =
                    model.BankAccountNumber;

                settings.BankIban =
                    model.BankIban;

                settings.BankAccountTitle =
                    model.BankAccountTitle;

                settings.PaymentInstructions =
                    model.PaymentInstructions;

                await _context.SaveChangesAsync();
            }

            return Json(
                new
                {
                    success = true,
                    message =
                        "Settings updated successfully in SQL Server!"
                });
        }


        // =========================================================
        // PROFILE
        // =========================================================

        [HttpPost]
        public async Task<IActionResult>
            UpdateProfile(
                [FromForm] Admin model,
                [FromForm] IFormFile? avatarFile)
        {
            if (!IsAuthenticated())
                return Unauthorized();

            var admin =
                await _context.Admins
                    .FirstOrDefaultAsync();

            if (admin != null)
            {
                admin.Name =
                    model.Name;

                admin.Title =
                    model.Title;

                admin.Email =
                    model.Email;

                if (!string.IsNullOrEmpty(
                    model.Password))
                {
                    admin.Password =
                        model.Password;
                }

                admin.Phone =
                    model.Phone;

                admin.Address =
                    model.Address;

                admin.Bio =
                    model.Bio;

                admin.GithubUrl =
                    model.GithubUrl;

                admin.LinkedinUrl =
                    model.LinkedinUrl;

                admin.TwitterUrl =
                    model.TwitterUrl;

                admin.FacebookUrl =
                    model.FacebookUrl;

                admin.UpdatedAt =
                    DateTime.UtcNow;


                if (avatarFile != null &&
                    avatarFile.Length > 0)
                {
                    var uploadsFolder =
                        Path.Combine(
                            Directory.GetCurrentDirectory(),
                            "wwwroot",
                            "Images");

                    if (!Directory.Exists(
                        uploadsFolder))
                    {
                        Directory.CreateDirectory(
                            uploadsFolder);
                    }

                    var fileName =
                        Guid.NewGuid().ToString() +
                        Path.GetExtension(
                            avatarFile.FileName);

                    var filePath =
                        Path.Combine(
                            uploadsFolder,
                            fileName);

                    using var stream =
                        new FileStream(
                            filePath,
                            FileMode.Create);

                    await avatarFile.CopyToAsync(
                        stream);

                    admin.Avatar =
                        fileName;
                }


                await _context.SaveChangesAsync();
            }

            return Json(
                new
                {
                    success = true,
                    message =
                        "Admin Profile updated successfully!"
                });
        }
    }
}
