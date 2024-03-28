namespace MokaServices.AuthenticationService.Application.Interfaces;

public interface ITokenGenerator
{
    // Method to generate a new token based on specific user claims or attributes
    Task<string> GenerateTokenAsync(UserClaims userClaims);
}

public class UserClaims
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public IEnumerable<string> Roles { get; set; }

    // Additional claims can include more specific user attributes as needed
    public string PreferredLanguage { get; set; }
    public string TimeZone { get; set; }
}