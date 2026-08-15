using System.ComponentModel.DataAnnotations;

namespace DaniPortfolio.Models
{
    public class Message
    {
        public int MessageID { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Subject { get; set; } = string.Empty;

        [Required]
        [StringLength(1000)]
        public string MessageText { get; set; } = string.Empty;

        public string Status { get; set; } = "Unread";

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
