using System.Security.Cryptography;
using System.Text;

public static class NanoId
{
    private const string DefaultAlphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private const int DefaultSize = 21;

    public static string Generate(string alphabet = DefaultAlphabet, int size = DefaultSize)
    {
        var stringBuilder = new StringBuilder(size);
        byte[] randomBytes = new byte[size];
        using var rng = RandomNumberGenerator.Create();

        rng.GetBytes(randomBytes);

        for (int i = 0; i < size; i++)
        {
            int pos = randomBytes[i] % alphabet.Length;
            stringBuilder.Append(alphabet[pos]);
        }

        return stringBuilder.ToString();
    }
}