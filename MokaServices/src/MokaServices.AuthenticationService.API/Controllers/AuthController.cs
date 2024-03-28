#region

using Microsoft.AspNetCore.Mvc;
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
        // Call the authentication service
        var result = await authenticationService.LoginAsync(request);
        if (result == null) return Unauthorized();
        return Ok(result);
    }
}