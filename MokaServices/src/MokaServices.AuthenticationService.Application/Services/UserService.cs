#region

using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Enums;
using MokaServices.AuthenticationService.Domain.Interfaces;

#endregion

namespace MokaServices.AuthenticationService.Application.Services;

public class UserService(
    IUserRepository userRepository,
    IRoleRepository roleRepository
) : IUserService
{
    public async Task<bool> RemoveUserAsync(string userId)
    {
        return await userRepository.RemoveAsync(userId);
    }

    public async Task<BaseUser> AddUserAsync(BaseUser user)
    {
        return await userRepository.AddAsync(user);
    }

    public Task<BaseUser?> GetUserAsync(string lookupValue, BaseUserLookupType lookupType)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<BaseUser>> GetAllUsersAsync()
    {
        return await userRepository.GetAllAsync();
    }

    public async Task<BaseUser?> UpdateUserAsync(BaseUser? user)
    {
        var success = await userRepository.UpdateAsync(user);
        return success ? user : null;
    }

    public async Task<IEnumerable<BaseRole>> GetUserRolesAsync(string userId)
    {
        return await userRepository.GetUserRolesAsync(userId);
    }


    public async Task<bool> RemoveRoleFromUserAsync(string userId, string roleId)
    {
        return await roleRepository.RemoveFromUserAsync(userId, roleId);
    }

    public async Task<bool> AssignRoleToUserAsync(string userId, string roleId)
    {
        return await roleRepository.AssignToUserAsync(userId, roleId);
    }

    public async Task<BaseUser?> GetUserByIdAsync(string userId)
    {
        return await userRepository.GetAsync(userId, BaseUserLookupType.Id);
    }
}