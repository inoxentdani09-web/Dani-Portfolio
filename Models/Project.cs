using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Models
{
    [Table("Projects")]
    public class Project
    {
        [Key]
        public int ProjectID { get; set; }

        public int? CategoryId { get; set; }

        [StringLength(100)]
        public string Category { get; set; } = "E-Commerce"; // E-Commerce, Portfolio, Dashboard, Dekstop

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [StringLength(255)]
        public string Image { get; set; } = "Project-bg.jpeg";

        [StringLength(255)]
        public string LiveDemo { get; set; } = "#";

        [StringLength(255)]
        public string GitHub { get; set; } = "#";

        [StringLength(200)]
        public string Technalogy { get; set; } = "ASP.NET Core, SQL Server";

        public bool IsFeatured { get; set; } = true;

        [StringLength(50)]
        public string Status { get; set; } = "Published";

        [Column("CreatedDate")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
