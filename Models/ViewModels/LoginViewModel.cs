using System.ComponentModel.DataAnnotations;

namespace Portfolio.Models.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = "admin@gmail.com";

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        public bool Remember { get; set; } = false;

        public string? ErrorMessage { get; set; }
    }
}
