namespace MokaServices.AuthenticationService.Application.Interfaces;

public interface IAuthenticationService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);
    
}