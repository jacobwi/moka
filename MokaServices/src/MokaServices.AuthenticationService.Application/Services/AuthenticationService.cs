using MokaServices.AuthenticationService.Application.DTOs;

namespace MokaServices.AuthenticationService.Application.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly ITokenGenerator _tokenGenerator; // Integrated token functionality
    private readonly IUserRepository _userRepository;

    public AuthenticationService(IUserRepository userRepository, ITokenGenerator tokenGenerator)
    {
        _userRepository = userRepository;
        _tokenGenerator = tokenGenerator;
    }

    public Task<AuthResponseDto> LoginAsync(LoginRequest request)
    {
        throw new NotImplementedException();
    }

    public Task<string> RefreshTokenAsync(string token, string refreshToken)
    {
        throw new NotImplementedException();
    }

    public Task<AuthResponseDto> RegisterUserAsync(RegistrationRequest userRegistration)
    {
        throw new NotImplementedException();
    }
}