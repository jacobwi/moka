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
}