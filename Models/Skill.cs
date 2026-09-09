using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Models
{
    [Table("Skills")]
    public class Skill
    {
        [Key]
        public int Id { get; set; }

        public int? CategoryId { get; set; }

        [StringLength(100)]
        public string CategoryName { get; set; } = "Frontend"; // Frontend, Backend, Database, Tools

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(255)]
        public string Icon { get; set; } = "HTML.png";

        [StringLength(50)]
        public string Level { get; set; } = "Advanced"; // Beginner, Intermediate, Advanced, Expert

        [Range(0, 100)]
        public int Proficiency { get; set; } = 90;

        [StringLength(50)]
        public string Status { get; set; } = "Published"; // Published, Draft

        public string Description { get; set; } = string.Empty;

        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
    }
}
