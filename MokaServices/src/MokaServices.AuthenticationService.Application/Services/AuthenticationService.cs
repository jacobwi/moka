#region

using MokaServices.AuthenticationService.Application.DTOs;
using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Enums;
using MokaServices.AuthenticationService.Domain.Exceptions;
using MokaServices.AuthenticationService.Domain.Interfaces;

#endregion

namespace MokaServices.AuthenticationService.Application.Services;

public class AuthenticationService(
    IUserRepository userRepository,
    ITokenGenerator tokenGenerator,
    IPasswordHasher passwordHasher)
    : IAuthenticationService
{
    public async Task<AuthResponseDto> LoginAsync(LoginRequest request)
    {
        var user = await userRepository.GetAsync(request.UsernameOrEmail,
            request.UsernameOrEmail.Contains('@') ? BaseUserLookupType.Email : BaseUserLookupType.Username);
        if (user == null || !passwordHasher.VerifyPassword(user.PasswordHash, request.Password))
            throw new AuthenticationException("Invalid credentials", contextInfo: GetType().Name);

        // Generate user claims
        var userClaims = new UserClaims
        {
            Username = user.Username,
            Email = user.Email,
            UserId = user.Id
        };

        var token = await tokenGenerator.GenerateTokenAsync(userClaims);

        // TODO: Map the user to a DTO if needed
        return new AuthResponseDto { Token = token, User = null };
    }

    public async Task<AuthResponseDto> RegisterUserAsync(RegistrationRequest userRegistration)
    {
        var existingUser = await userRepository.GetAsync(userRegistration.Username, BaseUserLookupType.Username);
        if (existingUser != null)
            throw new AuthenticationException(userRegistration.Username, contextInfo: GetType().Name);

        var hashedPassword = passwordHasher.HashPassword(userRegistration.Password);
        var newUser = new BaseUser
        {
            Username = userRegistration.Username,
            PasswordHash = hashedPassword,
            Email = userRegistration.Email,
            IsActive = true
        };

        await userRepository.AddAsync(newUser);


        var userClaims = new UserClaims
        {
            Username = newUser.Username,
            Email = newUser.Email,
            UserId = newUser.Id
        };

        var token = await tokenGenerator.GenerateTokenAsync(userClaims);

        // TODO: Map the user to a DTO if needed

        return new AuthResponseDto { Token = token, User = null };
    }

    public Task<string> RefreshTokenAsync(string token, string refreshToken)
    {
        // Implement the logic to verify the existing token, validate the refresh token,
        // and then generate a new JWT token if the refresh token is valid.
        throw new NotImplementedException();
    }
}