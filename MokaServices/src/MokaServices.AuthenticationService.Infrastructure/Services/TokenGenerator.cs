#region

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MokaServices.AuthenticationService.Application.Interfaces;
using MokaServices.AuthenticationService.Domain.Exceptions;

#endregion

namespace MokaServices.AuthenticationService.Infrastructure.Services;

public class TokenGenerator : ITokenGenerator
{
    private readonly string? _audience;
    private readonly string? _issuer;
    private readonly string? _secretKey;

    public TokenGenerator(IConfiguration configuration)
    {
        // Extract JWT settings from the configuration
        _secretKey = configuration["Jwt:Key"];
        _issuer = configuration["Jwt:Issuer"];
        _audience = configuration["Jwt:Audience"];

        // Validate that the secret key, issuer, and audience are not null or empty
        ValidateJwtSettings(_secretKey, nameof(_secretKey));
        ValidateJwtSettings(_issuer, nameof(_issuer));
        ValidateJwtSettings(_audience, nameof(_audience));
    }

    public Task<string> GenerateTokenAsync(UserClaims userClaims)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userClaims.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            // Add other claims as needed from UserClaims
        };

        var token = new JwtSecurityToken(
            _issuer,
            _audience,
            claims,
            expires: DateTime.UtcNow.AddHours(1), // Use UTC time to avoid timezone issues
            signingCredentials: creds);

        var tokenHandler = new JwtSecurityTokenHandler();
        var serializedToken = tokenHandler.WriteToken(token);

        return Task.FromResult(serializedToken);
    }

    private void ValidateJwtSettings(string? value, string paramName)
    {
        if (string.IsNullOrEmpty(value))
            throw new DetailedArgumentNullException(paramName, null,
                $"{paramName} in JwtSettings is not configured correctly in appsettings.json.");
    }
}