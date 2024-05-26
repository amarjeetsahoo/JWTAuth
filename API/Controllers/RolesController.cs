using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        public RolesController(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto createRoleDto)
        {
            if (string.IsNullOrEmpty(createRoleDto.RoleName))
            {
                return BadRequest("Role Name is Required!");
            }

            var roleExist = await _roleManager.RoleExistsAsync(createRoleDto.RoleName);
            if (roleExist)
            {
                return BadRequest("Role already exists!");
            }
            var roleResult = await _roleManager.CreateAsync(new IdentityRole(createRoleDto.RoleName));

            if (roleResult.Succeeded)
            {
                return Ok(new { message = "Role Deleted Successfully" });
            }
            return BadRequest("Role Creation Failed!");
        }

        [AllowAnonymous]
        [HttpGet("getRoles")]
        public async Task<ActionResult<IEnumerable<RoleResponseDto>>> GetRoles()
        {
            var roles = await _roleManager.Roles.Select(role => new RoleResponseDto
            {
                Id = role.Id,
                Name = role.Name,
                TotalUsers = _userManager.GetUsersInRoleAsync(role.Name!).Result.Count
            }).ToListAsync();

            return Ok(roles);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRole(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return NotFound("Role Not Found");
            }
            var result = await _roleManager.DeleteAsync(role);
            if (result.Succeeded)
            {
                return Ok(new { message = "Role Deleted Successfully" });
            }
            return BadRequest("Role Deletion Failed!");
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignRole([FromBody] RoleAssignDto assignDto)
        {
            var user = await _userManager.FindByIdAsync(assignDto.UserId);

            if (user == null)
            {
                return NotFound("User Not Found!");
            }
            var role = await _roleManager.FindByIdAsync(assignDto.RoleId);
            if (role == null)
            {
                return NotFound("Role Not Found!");
            }
            var result = await _userManager.AddToRoleAsync(user, role.Name!);
            if (result.Succeeded)
            {
                return Ok(new
                {
                    message = "Role assigned successfully"
                });
            }

            var err = result.Errors.FirstOrDefault();
            return BadRequest(err!.Description);
        }
    }
}
