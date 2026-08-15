using DaniPortfolio.Data;
using DaniPortfolio.Models;
using Microsoft.AspNetCore.Mvc;
namespace DaniPortfolio.Controllers
{
    public class HomeController : Controller
    {
        public readonly PortfolioDbContext _context;
        public HomeController(PortfolioDbContext Context)
        {
            _context = Context;
        }
        public IActionResult Index()
        {
            ViewBag.Projects = _context.Projects
       .Where(x => x.Status == "Published")
       .ToList();
            ViewBag.Course = _context.Courses.ToList();

            ViewBag.Skills = _context.Skills.ToList();

            ViewBag.SkillsCount = _context.Skills.Count();
            ViewBag.ProjectsCount = _context.Projects.Count();
            ViewBag.CourseCount = _context.Courses.Count();
            return View();
        }
        public IActionResult Skills()
        {
            var skills = _context.Skills.ToList();

            ViewBag.Skills = skills;

            return View();
        }
        public IActionResult Projects() {
            var projects = _context.Projects
        .Where(x => x.Status == "Published")
        .ToList();
            return View(projects);
        }
        public IActionResult Course()
        {
            var Courses = _context.Courses.ToList();
            return View(Courses);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SendMessage(Message message)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction("Index",null, "Contact");
            }

            message.Status = "Unread";
            message.CreatedDate = DateTime.Now;

            _context.Messages.Add(message);
            _context.SaveChanges();

            TempData["MessageSuccess"] = "Your message has been sent successfully!";

            return RedirectToAction("Index", null, "Contact");
        }
    }
}