#region

using Microsoft.EntityFrameworkCore;
using MokaServices.AuthenticationService.Application.Interfaces;
using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Enums;
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
}