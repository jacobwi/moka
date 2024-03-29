#region

using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Enums;

#endregion

namespace MokaServices.AuthenticationService.Domain.Interfaces;

public interface IUserRepository
{
    Task<BaseUser> AddAsync(BaseUser user);
    Task<BaseUser?> GetAsync(string lookupValue, BaseUserLookupType lookupType);

    Task<bool> UserExistsAsync(string lookupValue, BaseUserLookupType lookupType);
    Task<IEnumerable<BaseRole>> GetUserRolesAsync(string userId); // Method to get user roles
    Task<IEnumerable<BaseUser>> GetAllAsync();
    Task<bool> RemoveAsync(string userId);

    Task<bool> UpdateAsync(BaseUser? user);
}