using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage = "Role Name is Mandatory")]
        public string RoleName { get; set; } = String.Empty;
    }
}
