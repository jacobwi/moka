#region

using Authentication.Service.Presentation;
using Microsoft.AspNetCore.Identity;

#endregion

namespace Authentication.Service.Application;

public class AuthenticationService
{
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly IUserRepository _userRepo;

    public AuthenticationService(IUserRepository userRepo, IPasswordHasher<User> passwordHasher,
        ITokenService tokenService)
    {
        _userRepo = userRepo;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
    }

    public async Task<LoginResult> LoginAsync(string username, string password)
    {
        var user = await _userRepo.GetUserByUsernameAsync(username);
        if (user == null || _passwordHasher.VerifyHashedPassword(user, password, user.PasswordHash) ==
            PasswordVerificationResult.Failed) return new LoginResult { IsSuccessful = false };

        var token = _tokenService.GenerateJwtToken(user);
        return new LoginResult { IsSuccessful = true, Token = token };
    }
}