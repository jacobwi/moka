#region

using Authentication.Service.Application;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Authentication.Service.Presentation;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthenticationService _authenticationService;

    public AuthController(AuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResult>> Login([FromBody] LoginDto loginDto)
    {
        var result = await _authenticationService.LoginAsync(loginDto.Username, loginDto.Password);
        if (!result.IsSuccessful) return BadRequest();

        return Ok(result);
    }

    [HttpGet("ping")]
    public IActionResult Ping()
    {
        return Ok("Pong");
    }
}

public class LoginDto
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class LoginResult
{
    public bool IsSuccessful { get; set; }
    public string Token { get; set; }
}