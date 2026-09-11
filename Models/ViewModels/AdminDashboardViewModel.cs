namespace Portfolio.Models.ViewModels
{
    public class AdminDashboardViewModel
    {
        public Admin Admin { get; set; } = new();
        public Settings Settings { get; set; } = new();
        public List<Project> Projects { get; set; } = new();
        public List<Skill> Skills { get; set; } = new();
        public List<Course> Courses { get; set; } = new();
        public List<Message> Messages { get; set; } = new();
        public List<CourseEnrollment> Enrollments { get; set; } = new();
        
        public string ActiveTab { get; set; } = "dashboard";
        public string ActiveTitle { get; set; } = "Dashboard Overview";

        public int ProjectsCount => Projects.Count;
        public int TotalProjects => Projects.Count;
        public int SkillsCount => Skills.Count;
        public int TotalSkills => Skills.Count;
        public int CoursesCount => Courses.Count;
        public int TotalCourses => Courses.Count;
        public int MessagesCount => Messages.Count;
        public int TotalMessages => Messages.Count;
        public int UnreadMessagesCount => Messages.Count(m => !m.IsRead);
        public int EnrollmentsCount => Enrollments.Count;
        public int TotalEnrollments => Enrollments.Count;
        public int PendingEnrollmentsCount => Enrollments.Count(e => e.Status == "Pending");
        public int ApprovedEnrollmentsCount => Enrollments.Count(e => e.Status == "Approved");
    }
}
