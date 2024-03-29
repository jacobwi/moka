#region

using Microsoft.EntityFrameworkCore;
using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Interfaces;
using MokaServices.AuthenticationService.Infrastructure.Data;

#endregion

namespace MokaServices.AuthenticationService.Infrastructure.Repositories;

public class RoleRepository(AuthenticationDbContext context) : IRoleRepository
{
    public async Task<BaseRole> AddAsync(BaseRole role)
    {
        await context.Roles.AddAsync(role);
        await context.SaveChangesAsync();

        return role;
    }

    public async Task<BaseRole?> GetByIdAsync(string roleId)
    {
        return await context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);
    }

    public async Task<IEnumerable<BaseRole>> GetAllAsync()
    {
        return await context.Roles.ToListAsync();
    }

    public async Task<IEnumerable<string>> GetUserRolesAsync(string userId)
    {
        var user = await context.Users.Include(baseUser => baseUser.UserRoles).FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null) return new List<string>();

        return user.UserRoles.Select(r => r.Name);
    }

    public async Task<IEnumerable<string>> GetAllRolesAsync()
    {
        return await context.Roles.Select(r => r.Name).ToListAsync();
    }

    public async Task<bool> RoleExistsAsync(string role)
    {
        return await context.Roles.AnyAsync(r => r.Name == role);
    }

    public async Task<bool> AssignToUserAsync(string userId, string roleId)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        var role = await GetByIdAsync(roleId);

        if (user is null || role is null) return false;

        user.UserRoles.Add(role);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RemoveAsync(string roleId)
    {
        var role = await GetByIdAsync(roleId);

        if (role is null) return false;

        context.Roles.Remove(role);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RemoveFromUserAsync(string userId, string roleId)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        var role = await GetByIdAsync(roleId);

        if (user is null || role is null) return false;

        user.UserRoles.Remove(role);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UserHasRoleAsync(string userId, string roleId)
    {
        var user = await context.Users.Include(baseUser => baseUser.UserRoles).FirstOrDefaultAsync(u => u.Id == userId);
        var role = await GetByIdAsync(roleId);

        if (user is null || role is null) return false;

        return user.UserRoles.Contains(role);
    }
}