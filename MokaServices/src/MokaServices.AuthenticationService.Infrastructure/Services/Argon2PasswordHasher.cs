using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;
using MokaServices.AuthenticationService.Domain.Interfaces;

namespace MokaServices.AuthenticationService.Infrastructure.Services;

public class Argon2PasswordHasher : IPasswordHasher
{

    private const int HashSize = 16;
    public string HashPassword(string password)
    {
        var salt = GenerateSalt();
        using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = 8, // Adjust to match your environment
            MemorySize = 1024 * 1024, // 1 GB
            Iterations = 4,
        
        };

        var hash = argon2.GetBytes(HashSize);
        var hashPlusSalt = new byte[hash.Length + salt.Length];
        Buffer.BlockCopy(hash, 0, hashPlusSalt, 0, hash.Length);
        Buffer.BlockCopy(salt, 0, hashPlusSalt, hash.Length, salt.Length);

        return Convert.ToBase64String(hashPlusSalt);
    }

    public bool VerifyPassword(string hashedPassword, string providedPassword)
    {
        var hashBytes = Convert.FromBase64String(hashedPassword);

        // Assuming the salt is the last 16 bytes of the hash
        var salt = new byte[16];
        Buffer.BlockCopy(hashBytes, hashBytes.Length - 16, salt, 0, 16);

        // Hash the provided password with the same salt
        using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(providedPassword))
        {
            Salt = salt,
            DegreeOfParallelism = 8, // Must match the settings used to hash the password
            MemorySize = 1024 * 1024, // 1 GB
            Iterations = 4,
         
        };

        var testHash = argon2.GetBytes(HashSize);

        // Compare the newly generated hash with the original hash
        for (var i = 0; i < 16; i++)
        {
            if (testHash[i] != hashBytes[i])
                return false;
        }

        return true;
    }

    private byte[] GenerateSalt()
    {
        var buffer = new byte[16];
        RandomNumberGenerator.Fill(buffer);        
        return buffer;
    }
}