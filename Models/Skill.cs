using System.ComponentModel.DataAnnotations;

namespace DaniPortfolio.Models
{
    public class Skill
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [StringLength(200)]
        public string Icon { get; set; } = string.Empty;
        [Required]
        [StringLength(300)]
        public string Description { get; set; } = string.Empty;
        [Required]
        [StringLength(200)]
        public string Category { get; set; } = string.Empty;
        [Required]
        [StringLength(200)]
        public string Status { get; set; } = string.Empty;
        [Required]
        [StringLength(200)]
        public string Level { get; set; } = string.Empty;
        [Required]
        [DataType(DataType.Date)]
        public DateTime CreateDate { get; set; } = DateTime.Now;
    }
}
