#region

using MokaServices.AuthenticationService.Domain.Entities;

#endregion

namespace MokaServices.AuthenticationService.Domain.Interfaces;

public interface IPermissionRepository
{
    Task<BasePermission> AddAsync(BasePermission permission);
    Task<BasePermission?> GetByIdAsync(string permissionId);
    Task<IEnumerable<BasePermission>> GetAllAsync();
    Task<bool> RemoveAsync(string permissionId);
    Task<bool> AddToRoleAsync(string roleId, string permissionId);
    Task<bool> RemoveFromRoleAsync(string roleId, string permissionId);
    Task<bool> RoleHasPermissionAsync(string roleId, string permissionId);
    Task<IEnumerable<string>> GetRolePermissionsAsync(string roleId);
    Task<IEnumerable<string>> GetAllPermissionsAsync();
}