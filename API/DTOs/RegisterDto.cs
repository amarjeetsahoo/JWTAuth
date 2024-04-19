using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = String.Empty;

        [Required]
        public string FullName { get; set; } = String.Empty;

        public string Password { get; set; } = String.Empty;

        public List<string>? Roles { get; set; }
    }
}
