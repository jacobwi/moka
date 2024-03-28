#region

using System.ComponentModel.DataAnnotations;

#endregion

namespace MokaServices.AuthenticationService.Application.DTOs;

public class LoginRequest
{
    [Required(ErrorMessage = "Username or email is required.")]
    public string UsernameOrEmail { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    // Optional: Remember me feature for persisting the login session
    public bool? RememberMe { get; set; }
}