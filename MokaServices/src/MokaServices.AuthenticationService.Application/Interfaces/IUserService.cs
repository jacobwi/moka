#region

using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Enums;

#endregion

namespace MokaServices.AuthenticationService.Application.Interfaces;

public interface IUserService
{
    #region Roles

    Task<BaseUser> AddUserAsync(BaseUser user);
    Task<BaseUser?> GetUserAsync(string lookupValue, BaseUserLookupType lookupType);
    Task<IEnumerable<BaseUser>> GetAllUsersAsync();
    Task<bool> RemoveUserAsync(string userId);
    Task<BaseUser?> UpdateUserAsync(BaseUser? user);
    Task<IEnumerable<BaseRole>> GetUserRolesAsync(string userId);
    Task<bool> AssignRoleToUserAsync(string userId, string roleId);
    Task<bool> RemoveRoleFromUserAsync(string userId, string roleId);

    #endregion
}