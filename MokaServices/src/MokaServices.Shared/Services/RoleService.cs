#region

using Microsoft.Extensions.Caching.Memory;
using MokaServices.Shared.Models;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

#endregion

namespace MokaServices.Shared.Services;

public class RoleService
{
    private const string CacheKey = "Roles";
    private readonly IMemoryCache _cache;

    public RoleService(IMemoryCache cache)
    {
        _cache = cache ?? throw new ArgumentNullException(nameof(cache));
        LoadRoles();
    }

    private void LoadRoles()
    {
        if (_cache.TryGetValue(CacheKey, out List<Role>? roles)) return;

        roles = new List<Role>();
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(UnderscoredNamingConvention.Instance)
            .Build();

        var roleFiles = Directory.GetFiles(
            Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Configurations", "RolePermissions"),
            "*.yaml"
        );

        foreach (var file in roleFiles)
        {
            var content = File.ReadAllText(file);
            var role = deserializer.Deserialize<Role>(content); // Deserialize a single Role object
            roles.Add(role); // Add the deserialized Role object to the roles list
        }

        _cache.Set(CacheKey, roles);
    }

    public Role? GetRoleByName(string name)
    {
        return _cache.TryGetValue(CacheKey, out List<Role>? roles)
            ? roles.FirstOrDefault(r => r.Name.Equals(name, StringComparison.OrdinalIgnoreCase))
            : null;
    }

    public async Task<Role?> GetRoleByNameAsync(string name)
    {
        return await Task.Run(() => GetRoleByName(name));
    }

    public async Task<List<Permission>> GetPermissionsByRoleNameAsync(string name)
    {
        var role = await GetRoleByNameAsync(name);
        return role?.Permissions ?? new List<Permission>();
    }

    public IEnumerable<Role> GetAllRoles()
    {
        _cache.TryGetValue(CacheKey, out List<Role> roles);
        return roles;
    }
}