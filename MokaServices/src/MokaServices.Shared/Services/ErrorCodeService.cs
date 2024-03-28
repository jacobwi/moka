using Microsoft.Extensions.Caching.Memory;
using MokaServices.Shared.Models;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace MokaServices.Shared.Services;

public class ErrorCodeService
{
    private readonly IMemoryCache _cache;
    private const string CacheKey = "ErrorCodes";

    // Constructor with IMemoryCache dependency injection
    public ErrorCodeService(IMemoryCache cache)
    {
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        LoadErrorCodes();
    }

    private void LoadErrorCodes()
    {
        // Attempt to retrieve the error codes from the cache
        if (_cache.TryGetValue(CacheKey, out Dictionary<string, List<ErrorCode>>? errorCodes)) return;
        errorCodes = new Dictionary<string, List<ErrorCode>>();

        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(UnderscoredNamingConvention.Instance)
            .Build();

        var errorCodeFiles = Directory.GetFiles(Path.Combine("Configurations", "ErrorCodes"), "*.yaml");
        foreach (var file in errorCodeFiles)
        {
            var content = File.ReadAllText(file);
            var fileErrorCodes = deserializer.Deserialize<Dictionary<string, List<ErrorCode>>>(content);

            foreach (var entry in fileErrorCodes)
            {
                if (!errorCodes.TryGetValue(entry.Key, out var value))
                {
                    errorCodes.Add(entry.Key, entry.Value);
                }
                else
                {
                    value.AddRange(entry.Value);
                }
            }
        }

        // Store the loaded error codes in the cache
        _cache.Set(CacheKey, errorCodes);
    }

    public ErrorCode? GetErrorCode(string category, string code)
    {
        if (_cache.TryGetValue(CacheKey, out Dictionary<string, List<ErrorCode>> errorCodes) &&
            errorCodes.TryGetValue(category, out var codes))
        {
            return codes.FirstOrDefault(c => c.Code == code);
        }

        return null;
    }
}
