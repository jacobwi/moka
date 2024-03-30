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

        // Validate the secret key length for HS256
        ValidateKeyLength(_secretKey);
    }

    public Task<(string Token, DateTime ExpiresAt)> GenerateTokenAsync(UserClaims userClaims)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userClaims.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            // Add other claims as needed from UserClaims
        };
        var expiresAt = DateTime.UtcNow.AddHours(1);
        var token = new JwtSecurityToken(
            _issuer,
            _audience,
            claims,
            expires: expiresAt, // Use UTC time to avoid timezone issues
            signingCredentials: creds);

        var tokenHandler = new JwtSecurityTokenHandler();
        var serializedToken = tokenHandler.WriteToken(token);

        return Task.FromResult((Token: serializedToken, ExpiresAt: expiresAt));
    }

    private void ValidateJwtSettings(string? value, string paramName)
    {
        if (string.IsNullOrEmpty(value))
            throw new DetailedArgumentNullException(paramName, null,
                $"{paramName} in JwtSettings is not configured correctly in appsettings.json.");
    }

    private void ValidateKeyLength(string? secretKey)
    {
        if (secretKey == null) throw new ArgumentException("Secret key is null.");

        var keyBytes = Encoding.UTF8.GetBytes(secretKey);
        if (keyBytes.Length * 8 < 256) // Check if key length is less than 256 bits
            throw new DetailedArgumentNullException(nameof(secretKey), "<redacted>",
                "The secret key is not of sufficient length. It must be at least 256 bits long.");
    }
}