#region

using System.Net;
using Microsoft.AspNetCore.Mvc;
using MokaServices.AuthenticationService.Domain.Enums;
using MokaServices.AuthenticationService.Domain.Exceptions;
using MokaServices.Shared.Models;

#endregion

namespace MokaServices.AuthenticationService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminController(IUserService userService, IAuthenticationService authenticationService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = await userService.GetAllUsersAsync();
            return Ok(new ApiResponse<IEnumerable<BaseUser>>(
                true,
                users,
                "Users retrieved successfully."
            ));
        }
        catch (Exception e)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, new ApiResponse<object>(
                false,
                e.Message,
                "An error occurred while processing the request."
            ));
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        try
        {
            var user = await userService.GetUserAsync(id, BaseUserLookupType.Id);
            return Ok(new ApiResponse<BaseUser>(
                true,
                user,
                "User retrieved successfully."
            ));
        }
        catch (Exception e)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, new ApiResponse<object>(
                false,
                e.Message,
                "An error occurred while processing the request."
            ));
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] RegistrationRequest user)
    {
        try
        {
            var result = await authenticationService.RegisterUserAsync(user);
            return Ok(new ApiResponse<AuthResponse>(
                true,
                result,
                "User registration successful."
            ));
        }
        catch (AuthenticationException ex)
        {
            return BadRequest(new ApiResponse<object>(
                false,
                message: ex.Message
            ));
        }
        catch (Exception ex)
        {
            return BadRequest(new ApiResponse<object>(
                false,
                ex.Message,
                "An error occurred while processing the request."
            ));
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] BaseUser user)
    {
        try
        {
            // Check if the user exists
            var existingUser = await userService.GetUserAsync(id, BaseUserLookupType.Id);
            if (existingUser == null)
                return NotFound(new ApiResponse<object>(
                    false,
                    message: "User not found."
                ));

            var result = await userService.UpdateUserAsync(user);
            return Ok(new ApiResponse<BaseUser>(
                true,
                result,
                "User updated successfully."
            ));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        try
        {
            // Check if the user exists
            var existingUser = await userService.GetUserAsync(id, BaseUserLookupType.Id);
            if (existingUser == null)
                return NotFound(new ApiResponse<object>(
                    false,
                    message: "User not found."
                ));

            await userService.RemoveUserAsync(id);
            return Ok(new ApiResponse<object>(message: "User deleted successfully."
            ));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}