using MokaServices.AuthenticationService.Application.DTOs;

namespace MokaServices.AuthenticationService.Application.Interfaces;

public interface IAuthenticationService
{
    Task<AuthResponseDto> LoginAsync(LoginRequest request);

    // Method to register a new user
    Task<AuthResponseDto> RegisterUserAsync(RegistrationRequest userRegistration);
    // Method to refresh an expired JWT token
    Task<string> RefreshTokenAsync(string token, string refreshToken);
}