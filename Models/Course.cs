using System.ComponentModel.DataAnnotations;

namespace DaniPortfolio.Models
{
    public class Course
    {
        public int CourseID { get; set; }

        [Required]
        [StringLength(100)]
        public string CourseName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Platform { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Instructor { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Technology { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Level { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Duration { get; set; } = string.Empty;

        [Required]
        [Range(0,100)]
        public int Progress { get; set; }

        [Required]
        [StringLength(100)]
        public string Status { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? CompletionDate { get; set; }

        public bool Certificate { get; set; }

        [Required]
        [StringLength(100)]
        public string CourseUrl { get; set; } = string.Empty;

        [Required]
        [StringLength(300)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
