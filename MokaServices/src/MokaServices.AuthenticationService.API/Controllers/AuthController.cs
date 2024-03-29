#region

using System.Net;
using Microsoft.AspNetCore.Mvc;
using MokaServices.AuthenticationService.Domain.Exceptions;
using MokaServices.Shared.Models;
using LoginRequest = MokaServices.AuthenticationService.Application.DTOs.LoginRequest;

#endregion

namespace MokaServices.AuthenticationService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthenticationService authenticationService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var result = await authenticationService.LoginAsync(request);
            return Ok(new ApiResponse<AuthResponse>(
                true,
                result,
                "Login successful."
            ));
        }
        catch (AuthenticationException ex)
        {
            return Unauthorized(new ApiResponse<object>(
                false,
                ex.Message,
                "Invalid credentials."
            ));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, new ApiResponse<object>(
                false,
                ex.Message,
                "An error occurred while processing the request."
            ));
        }
    }


    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationRequest request)
    {
        try
        {
            var result = await authenticationService.RegisterUserAsync(request);
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
}