using DaniPortfolio.Data;
using DaniPortfolio.Models;
using DaniPortfolio.ViewModals;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClosedXML.Excel;

namespace DaniPortfolio.Controllers
{

    public class AdminController:Controller
    {
        public readonly PortfolioDbContext _context;

        public AdminController(PortfolioDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult Dashboard()
        {
            var dashboard = _context.Projects.ToList();
            ViewBag.ProjectsCount = _context.Projects.Count();
            ViewBag.LearnCount = _context.Courses.Count();
            ViewBag.SkillsCount = _context.Skills.Count();

            ViewBag.publishedCount = _context.Projects.Count(x => x.Status == "Published");
            ViewBag.draftCount = _context.Projects.Count(x => x.Status == "Draft");

            ViewBag.RecentProjects = _context.Projects.OrderByDescending(x => x.CreatedDate).Take(5).ToList();

            return PartialView("_Dashboard", dashboard);
        }
        [HttpPost]

        public IActionResult Login(Admin admin)
        {
            var user = _context.Admins.FirstOrDefault(x =>
            x.Email == admin.Email
            && x.Password == admin.Password);
            if(user != null)
            {
                return RedirectToAction("Dashboard");
            }
            ViewBag.Error = "Invalid Email or Password";
            return View();

        }
        public IActionResult Projects()
        {
            var vm = new ProjectsViewModal()
            {
                projects = _context.Projects.ToList(),
                project = new Projects()
            };
         
            ViewBag.ProjectsCount = _context.Projects.Count();
            ViewBag.LearnCount = _context.Courses.Count();
            ViewBag.SkillsCount = _context.Skills.Count();

            ViewBag.publishedCount = _context.Projects.Count(x => x.Status == "Published");
            ViewBag.draftCount = _context.Projects.Count(x => x.Status == "Draft");

            ViewBag.RecentProjects = _context.Projects.OrderByDescending(x => x.CreatedDate).Take(5).ToList();
            return PartialView("_Admin_Projects", vm);
        }

        // Partial: Skills page
        public IActionResult Skills()
        {
            var vm = new SkillViewModal()
            {
                skills = _context.Skills.ToList(),
                skill = new Skill()
            };

            ViewBag.SkillsCount = _context.Skills.Count();

            ViewBag.BeginnerCount =
                _context.Skills.Count(x => x.Level == "Beginner");

            ViewBag.IntermediateCount =
                _context.Skills.Count(x => x.Level == "Intermediate");

            ViewBag.AdvancedCount =
                _context.Skills.Count(x => x.Level == "Advanced");

            ViewBag.PublishedCount =
                _context.Skills.Count(x => x.Status == "Published");

            ViewBag.DraftCount =
                _context.Skills.Count(x => x.Status == "Draft");

            return PartialView("_Admin_Skills", vm);
        }
        //Partial: Message page
        public IActionResult Message()
        {
            var message = _context.Messages.ToList();
            ViewBag.SkillsCount = _context.Messages.Count();
            return PartialView("_Admin_Message", message);
        }

        public IActionResult ExportProjects()
        {
            var projects = _context.Projects.ToList();

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Projects");

                // Headers
                worksheet.Cell(1, 1).Value = "ID";
                worksheet.Cell(1, 2).Value = "Title";
                worksheet.Cell(1, 3).Value = "Category";
                worksheet.Cell(1, 4).Value = "Technology";
                worksheet.Cell(1, 5).Value = "Status";
                worksheet.Cell(1, 6).Value = "GitHub";
                worksheet.Cell(1, 7).Value = "Live Demo";
                worksheet.Cell(1, 8).Value = "Created Date";

                int row = 2;

                foreach (var item in projects)
                {
                    worksheet.Cell(row, 1).Value = item.ProjectID;
                    worksheet.Cell(row, 2).Value = item.Title;
                    worksheet.Cell(row, 3).Value = item.category;
                    worksheet.Cell(row, 4).Value = item.Technalogy;
                    worksheet.Cell(row, 5).Value = item.Status;
                    worksheet.Cell(row, 6).Value = item.GitHub;
                    worksheet.Cell(row, 7).Value = item.LiveDemo;
                    worksheet.Cell(row, 8).Value = item.CreatedDate.ToString("dd MMM yyyy");

                    row++;
                }

                worksheet.Columns().AdjustToContents();

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);

                    var content = stream.ToArray();

                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "Projects.xlsx");
                }
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateProjects(ProjectsViewModal vm, IFormFile ImageFile)
        {
            ModelState.Remove("project.Image");
           
            try
            {
                // UPDATE
                if (vm.project.ProjectID > 0)
                {
                    var existingProject = 
                        await _context.Projects.FirstOrDefaultAsync(x => x.ProjectID == vm.project.ProjectID);


                    if (existingProject == null)
                    {
                        return NotFound();
                    }

                    existingProject.Title = vm.project.Title;
                    existingProject.Description = vm.project.Description;
                    existingProject.category = vm.project.category;
                    existingProject.Technalogy = vm.project.Technalogy;
                    existingProject.Status = vm.project.Status;
                    existingProject.GitHub = vm.project.GitHub;
                    existingProject.LiveDemo = vm.project.LiveDemo;


                    // Image update
                    if (ImageFile != null && ImageFile.Length > 0)
                    {
                        string fileName = Guid.NewGuid().ToString() + Path.GetExtension(ImageFile.FileName);

                        string folder = Path.Combine(
                            Directory.GetCurrentDirectory(),
                            "wwwroot",
                            "Images"
                        );

                        if (!Directory.Exists(folder))
                        {
                            Directory.CreateDirectory(folder);
                        }

                        string filePath = Path.Combine(folder, fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await ImageFile.CopyToAsync(stream);
                        }

                        existingProject.Image = fileName;
                    }
                }
                else
                {
                    // INSERT

                    if (ImageFile != null && ImageFile.Length > 0)
                    {
                        string fileName = Guid.NewGuid().ToString() + Path.GetExtension(ImageFile.FileName);

                        string folder = Path.Combine(
                            Directory.GetCurrentDirectory(),
                            "wwwroot",
                            "Images"
                        );

                        if (!Directory.Exists(folder))
                        {
                            Directory.CreateDirectory(folder);
                        }

                        string filePath = Path.Combine(folder, fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await ImageFile.CopyToAsync(stream);
                        }

                        vm.project.Image = fileName;
                    }


                    vm.project.CreatedDate = DateTime.Now;
                    vm.project.Status = "Published";

                    _context.Projects.Add(vm.project);
                }


                await _context.SaveChangesAsync();

                return RedirectToAction(nameof(Dashboard));

            }
            catch (Exception ex)
            {
                return Content(ex.ToString());
            }
        }
        public IActionResult DeleteProject(int id)
        {
            var project = _context.Projects.FirstOrDefault(x => x.ProjectID == id);

            if (project == null)
            {
                return NotFound();
            }

            // Image bhi delete karni ho to
            if (!string.IsNullOrEmpty(project.Image))
            {
                string imagePath = Path.Combine(Directory.GetCurrentDirectory(),
                    "wwwroot", "Images", project.Image);

                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }

            _context.Projects.Remove(project);
            _context.SaveChanges();

            return RedirectToAction(nameof(Dashboard));
        }

        [HttpGet]
        public IActionResult GetProject(int id)
        {
            var project = _context.Projects.FirstOrDefault(x => x.ProjectID == id);

            if (project == null)
            {
                return NotFound();
            }

            return Json(project);
        }

        // Partial: course page
        public IActionResult Course()
        {
            var course = _context.Courses.ToList();
            ViewBag.CourseCount = _context.Courses.Count();
            return PartialView("_Admin_Course", course);
        }
    }
}
