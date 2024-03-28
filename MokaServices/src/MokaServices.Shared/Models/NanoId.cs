#region

using System.Security.Cryptography;
using System.Text;

#endregion

namespace MokaServices.Shared.Models;

public static class NanoId
{
    private const string DefaultAlphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private const int DefaultSize = 21;

    public static string Generate(string alphabet = DefaultAlphabet, int size = DefaultSize)
    {
        var stringBuilder = new StringBuilder(size);
        var randomBytes = new byte[size];
        using var rng = RandomNumberGenerator.Create();

        rng.GetBytes(randomBytes);

        for (var i = 0; i < size; i++)
        {
            var pos = randomBytes[i] % alphabet.Length;
            stringBuilder.Append(alphabet[pos]);
        }

        return stringBuilder.ToString();
    }
}