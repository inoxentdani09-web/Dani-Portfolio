namespace Portfolio.Models.ViewModels
{
    public class HomeViewModel
    {
        public Admin Admin { get; set; } = new();
        public Settings Settings { get; set; } = new();
        public List<Skill> Skills { get; set; } = new();
        public List<Project> Projects { get; set; } = new();
        public List<Course> Courses { get; set; } = new();
        public string? MessageSuccess { get; set; }
        public int TotalProjects { get; set; }
        public int TotalSkills { get; set; }
        public int TotalCourses { get; set; }
    }
}
