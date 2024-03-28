namespace MokaServices.AuthenticationService.Domain.Interfaces;

public interface  IPasswordHasher
{
    string HashPassword(string password);
    bool VerifyPassword(string hashedPassword, string providedPassword);
}