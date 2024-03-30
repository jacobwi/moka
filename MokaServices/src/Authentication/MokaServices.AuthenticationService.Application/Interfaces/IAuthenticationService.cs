#region

using MokaServices.AuthenticationService.Application.DTOs;

#endregion

namespace MokaServices.AuthenticationService.Application.Interfaces;

public interface IAuthenticationService
{
    Task<AuthResponse> LoginAsync(LoginRequest request);

    // Method to register a new user
    Task<AuthResponse> RegisterUserAsync(RegistrationRequest userRegistration);

    // Method to refresh an expired JWT token
    Task<string> RefreshTokenAsync(string token, string refreshToken);
}