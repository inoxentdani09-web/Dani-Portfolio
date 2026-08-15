using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace DaniPortfolio.Models
{
    public class Projects
    {
        [Key]
        public int ProjectID { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;


        public string? Image { get; set; }

        [Required]
        [StringLength(100)]
        public string category { get; set; } = string.Empty;
        [Required]
        [StringLength(100)]
        public string Technalogy { get; set; } = string.Empty;
        [Required]
        [StringLength(100)]
        public string Status { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Date)]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Required]
        [Url]
        public string LiveDemo { get; set; } = string.Empty;

        [Required]
        [Url]
        public string GitHub { get; set; } = string.Empty;
    }
}
