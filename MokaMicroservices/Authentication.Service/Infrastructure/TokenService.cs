#region

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

#endregion

namespace Authentication.Service;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
            // Add other claims if needed (roles, etc.)
        };

        var secretKey =
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Secret"])); // Load from Azure Key Vault in production
        var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(60), // Adjust expiration
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public interface ITokenService
{
    string GenerateJwtToken(User user);
}