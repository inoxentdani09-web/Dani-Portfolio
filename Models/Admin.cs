using System.ComponentModel.DataAnnotations;

namespace DaniPortfolio.Models
{
    public class Admin
    {
        public int AdminId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [StringLength(100)]
        public string Password { get; set; } = string.Empty;
    }
}
