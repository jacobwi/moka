#region

using Microsoft.EntityFrameworkCore;
using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Enums;
using MokaServices.AuthenticationService.Domain.Interfaces;
using MokaServices.AuthenticationService.Infrastructure.Data;

#endregion

namespace MokaServices.AuthenticationService.Infrastructure.Repositories;

public class UserRepository(AuthenticationDbContext context) : IUserRepository
{
    public async Task<BaseUser> AddAsync(BaseUser user)
    {
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();

        // TODO: Return the user with the updated ID or just return the id?
        return user;
    }

    public async Task<BaseUser?> GetAsync(string lookupValue, BaseUserLookupType lookupType)
    {
        return lookupType switch
        {
            BaseUserLookupType.Email => await context.Users.FirstOrDefaultAsync(u => u.Email == lookupValue),
            BaseUserLookupType.Username => await context.Users.FirstOrDefaultAsync(u => u.Username == lookupValue),
            BaseUserLookupType.Id => await context.Users.FirstOrDefaultAsync(u => u.Id == lookupValue),
            _ => null
        };
    }

    public Task<bool> UserExistsAsync(string lookupValue, BaseUserLookupType lookupType)
    {
        return lookupType switch
        {
            BaseUserLookupType.Email => context.Users.AnyAsync(u => u.Email == lookupValue),
            BaseUserLookupType.Username => context.Users.AnyAsync(u => u.Username == lookupValue),
            BaseUserLookupType.Id => context.Users.AnyAsync(u => u.Id == lookupValue),
            _ => Task.FromResult(false)
        };
    }

    public async Task<IEnumerable<BaseRole>> GetUserRolesAsync(string userId)
    {
        var user = await context.Users.Include(u => u.UserRoles).FirstOrDefaultAsync(u => u.Id == userId);

        return user?.UserRoles ?? new List<BaseRole>();
    }

    public async Task<IEnumerable<BaseUser>> GetAllAsync()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<bool> RemoveAsync(string userId)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null) return false;

        context.Users.Remove(user);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateAsync(BaseUser? user)
    {
        var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

        if (existingUser is null) return false;

        context.Entry(existingUser).CurrentValues.SetValues(user);
        await context.SaveChangesAsync();

        return true;
    }
}