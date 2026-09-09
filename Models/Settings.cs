using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portfolio.Models
{
    [Table("Settings")]
    public class Settings
    {
        [Key]
        public int Id { get; set; } = 1;

        [StringLength(150)]
        public string SiteTitle { get; set; } = "Daniyal | Full Stack Developer";

        [StringLength(255)]
        public string Tagline { get; set; } = "A Full Stack Developer Who Builds Real, Working Solutions";

        [StringLength(100)]
        public string HeroHeading { get; set; } = "Hi, I'm Daniyal";

        [StringLength(150)]
        public string HeroSubheading { get; set; } = "Full Stack Developer & Software Engineer";

        public string HeroDescription { get; set; } = "I design and develop responsive websites, dynamic web applications, and desktop software — from pixel-perfect front-end designs with HTML5, CSS3, Tailwind CSS, and React, to robust back-end systems built with ASP.NET Core, Node.js, and SQL Server.";

        [StringLength(100)]
        public string AboutHeading { get; set; } = "Who I Am";

        public string AboutDescription { get; set; } = "I'm Daniyal, a passionate Full Stack Developer with a drive for building scalable, high-impact digital products. On the front end, I craft clean, interactive interfaces using modern frameworks. On the back end, I architect reliable databases and secure APIs.";

        [StringLength(50)]
        public string YearsExperience { get; set; } = "2+";

        public int CompletedProjects { get; set; } = 15;

        public int HappyClients { get; set; } = 12;

        public int TechnologiesCount { get; set; } = 10;

        [StringLength(150)]
        public string Email { get; set; } = "inoxentdani09@gmail.com";

        [StringLength(50)]
        public string Phone { get; set; } = "+92 318 2315238";

        [StringLength(100)]
        public string Location { get; set; } = "Karachi, Pakistan";

        [StringLength(100)]
        public string WorkingHours { get; set; } = "Mon - Sat: 9:00 AM - 6:00 PM";

        [StringLength(50)]
        public string JazzCashNumber { get; set; } = "0318-2315238";

        [StringLength(100)]
        public string JazzCashTitle { get; set; } = "Daniyal Khan";

        [StringLength(50)]
        public string EasyPaisaNumber { get; set; } = "0318-2315238";

        [StringLength(100)]
        public string EasyPaisaTitle { get; set; } = "Daniyal Khan";

        [StringLength(100)]
        public string BankName { get; set; } = "Meezan Bank / HBL";

        [StringLength(50)]
        public string BankAccountNumber { get; set; } = "0102-03182315238";

        [StringLength(50)]
        public string BankIban { get; set; } = "PK36MEZN00010203182315238";

        [StringLength(100)]
        public string BankAccountTitle { get; set; } = "Daniyal Khan";

        public string PaymentInstructions { get; set; } = "Please send course fee to any account above. After payment, enter Transaction ID (TID) and attach screenshot. Daniyal will verify and approve your course access.";
    }
}
