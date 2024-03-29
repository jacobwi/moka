#region

using MokaServices.AuthenticationService.Domain.Entities;

#endregion

namespace MokaServices.AuthenticationService.Domain.Interfaces;

public interface IRoleRepository
{
    Task<BaseRole> AddAsync(BaseRole role);
    Task<BaseRole?> GetByIdAsync(string roleId);
    Task<IEnumerable<BaseRole>> GetAllAsync();
    Task<bool> RemoveAsync(string roleId);
    Task<bool> AssignToUserAsync(string userId, string roleId);
    Task<bool> RemoveFromUserAsync(string userId, string roleId);
    Task<bool> UserHasRoleAsync(string userId, string roleId);

    Task<IEnumerable<string>>
        GetUserRolesAsync(string userId);

    Task<IEnumerable<string>> GetAllRolesAsync();
    Task<bool> RoleExistsAsync(string role);
}