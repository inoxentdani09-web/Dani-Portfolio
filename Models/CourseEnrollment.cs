using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Models
{
    [Table("CourseEnrollments")]
    public class CourseEnrollment
    {
        [Key]
        public int EnrollmentID { get; set; }

        [Required]
        public int CourseID { get; set; }

        [ForeignKey("CourseID")]
        public virtual Course? Course { get; set; }

        [StringLength(200)]
        public string CourseTitle { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string StudentName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string StudentEmail { get; set; } = string.Empty;

        [StringLength(50)]
        public string StudentPhone { get; set; } = string.Empty;

        [StringLength(50)]
        public string PaymentMethod { get; set; } = "JazzCash"; // JazzCash, EasyPaisa, BankTransfer, FreeAccess

        [StringLength(100)]
        public string TransactionId { get; set; } = string.Empty;

        [StringLength(255)]
        public string ScreenshotProof { get; set; } = string.Empty;

        [StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected

        [StringLength(100)]
        public string AccessCode { get; set; } = string.Empty;

        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    }
}
