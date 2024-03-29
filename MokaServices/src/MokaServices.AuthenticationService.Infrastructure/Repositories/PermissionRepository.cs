#region

using Microsoft.EntityFrameworkCore;
using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Interfaces;
using MokaServices.AuthenticationService.Infrastructure.Data;

#endregion

namespace MokaServices.AuthenticationService.Infrastructure.Repositories;

public class PermissionRepository(AuthenticationDbContext context) : IPermissionRepository
{
    public async Task<bool> RemoveAsync(string permissionId)
    {
        var permission = await GetByIdAsync(permissionId);

        if (permission is null) return false;

        context.Permissions.Remove(permission);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> AddToRoleAsync(string roleId, string permissionId)
    {
        var role = await context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);
        var permission = await GetByIdAsync(permissionId);

        if (role is null || permission is null) return false;

        role.Permissions.Add(permission);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<IEnumerable<string>> GetAllPermissionsAsync()
    {
        return await context.Permissions.Select(p => p.Name).ToListAsync();
    }

    public async Task<BasePermission> AddAsync(BasePermission permission)
    {
        await context.Permissions.AddAsync(permission);
        await context.SaveChangesAsync();

        return permission;
    }

    public async Task<IEnumerable<BasePermission>> GetAllAsync()
    {
        return await context.Permissions.ToListAsync();
    }

    public async Task<bool> RoleHasPermissionAsync(string roleId, string permissionId)
    {
        var role = await context.Roles.Include(baseRole => baseRole.Permissions)
            .FirstOrDefaultAsync(r => r.Id == roleId);
        var permission = await GetByIdAsync(permissionId);

        if (role is null || permission is null) return false;

        return role.Permissions.Contains(permission);
    }

    public async Task<IEnumerable<string>> GetRolePermissionsAsync(string roleId)
    {
        var role = await context.Roles.Include(baseRole => baseRole.Permissions)
            .FirstOrDefaultAsync(r => r.Id == roleId);

        if (role is null) return new List<string>();

        return role.Permissions.Select(p => p.Name);
    }

    public async Task<BasePermission?> GetByIdAsync(string permissionId)
    {
        return await context.Permissions.FirstOrDefaultAsync(p => p.Id == permissionId);
    }

    public async Task<bool> RemoveFromRoleAsync(string roleId, string permissionId)
    {
        var role = await context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);
        var permission = await GetByIdAsync(permissionId);

        if (role is null || permission is null) return false;

        role.Permissions.Remove(permission);
        await context.SaveChangesAsync();

        return true;
    }
}