using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Portfolio.Models 
{ 
    [Table("Courses")] public class Course 
    { [Key] public int CourseID { get; set; }
        [Required][StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [StringLength(255)] 
        public string Subtitle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty; 
        [StringLength(100)]
        public string Category { get; set; } = "Backend"; 
        [StringLength(50)]
        public string PriceType { get; set; } = "paid"; 
        [StringLength(50)] 
        public string Price { get; set; } = "PKR 3,500"; 
        [StringLength(50)]
        public string OriginalPrice { get; set; } = "PKR 6,000";
        [StringLength(50)]
        public string Duration { get; set; } = "8 Weeks";
        [StringLength(50)]
        public string Level { get; set; } = "All Levels";
        [StringLength(50)] 
        public string LecturesCount { get; set; } = "36 Lectures";
        [StringLength(50)]
        public string Language { get; set; } = "Urdu / Hindi";
        // IMPORTANT: // Courses table mein Platform NOT NULL hai.
         [StringLength(100)]
        public string Platform { get; set; } = "Online"; 
        public double Rating { get; set; } = 4.9; 
        public int EnrolledStudents { get; set; } = 120;
        [StringLength(50)] 
        public string Status { get; set; } = "Published"; 
        [StringLength(500)]
        public string VideoUrl { get; set; } = "https://www.youtube.com";
        public string Syllabus { get; set; } = string.Empty; 
        [Column("CreatedDate")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
        // 1 Course -> Many Enrollments
        public virtual ICollection<CourseEnrollment> Enrollments { get; set; } = new List<CourseEnrollment>();
    } 
}