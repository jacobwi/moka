#region

using MokaServices.AuthenticationService.Domain.Entities;
using MokaServices.AuthenticationService.Domain.Enums;

#endregion

namespace MokaServices.AuthenticationService.Application.Interfaces;

public interface IUserRepository
{
    Task<BaseUser> AddAsync(BaseUser user);
    Task<BaseUser?> GetAsync(string lookupValue, BaseUserLookupType lookupType);
}