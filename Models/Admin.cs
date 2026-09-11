using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Models
{
    [Table("Admins")]
    public class Admin
    {
        [Key]
        [Column("AdminId")]
        public int Id { get; set; } = 1;

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = "Daniyal Khan";

        [StringLength(150)]
        public string Title { get; set; } = "Full Stack Developer";

        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string Email { get; set; } = "admin@gmail.com";

        [Required]
        [StringLength(255)]
        public string Password { get; set; } = "admin1234";

        [StringLength(50)]
        public string Phone { get; set; } = "+92 318 2315238";

        [StringLength(200)]
        public string Address { get; set; } = "Karachi, Pakistan";

        [StringLength(255)]
        public string Avatar { get; set; } = "profile.jpg";

        public string Bio { get; set; } = "I am a Full Stack Developer specializing in React, ASP.NET MVC, .NET Core, Node.js, and SQL Server with over 2 years of proven professional experience.";

        [StringLength(255)]
        public string GithubUrl { get; set; } = "https://github.com/inoxentdani09-web";

        [StringLength(255)]
        public string LinkedinUrl { get; set; } = "https://linkedin.com/in/daniyal-developer";

        [StringLength(255)]
        public string TwitterUrl { get; set; } = "https://twitter.com/daniyal_dev";

        [StringLength(255)]
        public string FacebookUrl { get; set; } = "https://facebook.com/daniyal.dev";

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
