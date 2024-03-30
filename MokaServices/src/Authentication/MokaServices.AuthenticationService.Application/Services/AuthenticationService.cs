#region

using MokaServices.AuthenticationService.Application.DTOs;
using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Enums;
using MokaServices.AuthenticationService.Domain.Exceptions;
using MokaServices.AuthenticationService.Domain.Interfaces;
using MokaServices.Shared.Services;

#endregion

namespace MokaServices.AuthenticationService.Application.Services;

public class AuthenticationService(
    IUserRepository userRepository,
    ITokenGenerator tokenGenerator,
    RoleService roleService,
    IPasswordHasher passwordHasher)
    : IAuthenticationService
{
    public Task<string> RefreshTokenAsync(string token, string refreshToken)
    {
        // Implement the logic to verify the existing token, validate the refresh token,
        // and then generate a new JWT token if the refresh token is valid.
        throw new NotImplementedException();
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await userRepository.GetAsync(request.UsernameOrEmail,
            request.UsernameOrEmail.Contains('@') ? BaseUserLookupType.Email : BaseUserLookupType.Username);
        if (user == null || !passwordHasher.VerifyPassword(user.PasswordHash, request.Password))
            throw new AuthenticationException("Invalid credentials", contextInfo: GetType().Name);

        // TODO: Maybe there's a better way to handle this? Perform load testing lazy load vs preloading
        // Get user roles
        var userRoles = await userRepository.GetUserRolesAsync(user.Id);
        user.UserRoles = userRoles.ToList();


        // Generate user claims
        var userClaims = new UserClaims
        {
            Username = user.Username,
            Email = user.Email,
            UserId = user.Id,
            Roles = user.UserRoles.Select(r => r.Name).ToList()
        };

        var tokenGenerateResult = await tokenGenerator.GenerateTokenAsync(userClaims);

        return new AuthResponse { Token = tokenGenerateResult.Token, ExpiresAt = tokenGenerateResult.ExpiresAt };
    }

    public async Task<AuthResponse> RegisterUserAsync(RegistrationRequest userRegistration)
    {
        var existingUserName =
            await userRepository.UserExistsAsync(userRegistration.Username, BaseUserLookupType.Username);
        if (existingUserName)
            throw new AuthenticationException("Username is already taken", contextInfo: GetType().Name);

        var existingEmail = await userRepository.UserExistsAsync(userRegistration.Email, BaseUserLookupType.Email);
        if (existingEmail)
            throw new AuthenticationException("Email is already taken", contextInfo: GetType().Name);

        var hashedPassword = passwordHasher.HashPassword(userRegistration.Password);
        var newUser = new BaseUser
        {
            Username = userRegistration.Username,
            PasswordHash = hashedPassword,
            Email = userRegistration.Email,
            IsActive = true
        };

        var defaultRole = await roleService.GetRoleByNameAsync("BasicUser");
        if (defaultRole == null)
            throw new AuthenticationException("Default role not found", contextInfo: GetType().Name);

        // Get role perrmisions
        var permissions = defaultRole.Permissions.Select(permission => new BasePermission
            { Name = permission.Name, Description = permission.Description }).ToList();

        newUser.UserRoles.Add(new BaseRole { Name = defaultRole.Name, Permissions = permissions });
        await userRepository.AddAsync(newUser);


        var userClaims = new UserClaims
        {
            Username = newUser.Username,
            Email = newUser.Email,
            UserId = newUser.Id,
            Roles = newUser.UserRoles.Select(r => r.Name).ToList()
        };

        var tokenGenerateResult = await tokenGenerator.GenerateTokenAsync(userClaims);

        return new AuthResponse { Token = tokenGenerateResult.Token, ExpiresAt = tokenGenerateResult.ExpiresAt };
    }
}