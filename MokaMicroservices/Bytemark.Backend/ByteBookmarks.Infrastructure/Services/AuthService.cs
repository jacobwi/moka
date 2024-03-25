
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ByteBookmarks.Application.Users;
using ByteBookmarks.Application.Users.Commands;
using ByteBookmarks.Application.Users.DTOs;
using Microsoft.IdentityModel.Tokens;

namespace ByteBookmarks.Infrastructure.Services;

public class AuthService(IConfiguration configuration, DataContext context) : IAuthService
{
    public async Task<AuthenticationResponse> GenerateJwtToken(ApplicationUser user)
    {
        var claims = new List<Claim>
        {
            new("userId", user.Id),
            new(JwtRegisteredClaimNames.UniqueName, user.Username),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

            new("role", user.Role.ToString())
        };

        // TODO: Improve null check
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration["Jwt:Key"])); // Replace with how you retrieve your secret
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: signingCredentials
        );

        // Key change:
        return await Task.FromResult(new AuthenticationResponse
        {
            JwtToken = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }

    public async Task<AuthenticationResponse> RegisterUser(RegisterUserCommand userDto)
    {
        // Check for existing username
        if (await context.Users.AnyAsync(u => u.Username == userDto.Username))
            throw new Exception("Username already exists"); // Or return a more specific error

        // Hash the password
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

        var newUser = new ApplicationUser
        {
            Username = userDto.Username,
            Password = hashedPassword,
            Email = userDto.Email,
            Id = Guid.NewGuid().ToString(),
            Role = Role.Basic
        };

        // Create a new user profile for the new user
        var newProfile = new UserProfile
        {
            UserId = newUser.Id
        };

        context.Users.Add(newUser);
        context.UserProfiles.Add(newProfile);

        await context.SaveChangesAsync();

        return await GenerateJwtToken(newUser);
    }

    public async Task<AuthenticationResponse> LoginUser(LoginUserCommand userDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Username == userDto.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.Password))
            throw new Exception("Invalid username or password"); // Or a more specific error

        return
            await GenerateJwtToken(user);
    }



}