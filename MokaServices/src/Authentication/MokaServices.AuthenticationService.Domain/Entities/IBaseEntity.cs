#region

using MokaServices.Shared.Attributes;

#endregion

namespace MokaServices.AuthenticationService.Domain.Entities;

public interface IBaseEntity
{
    [NanoId] string Id { get; set; }
}