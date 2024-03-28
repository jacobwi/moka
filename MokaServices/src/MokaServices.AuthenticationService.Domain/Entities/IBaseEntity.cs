using MokaServices.Shared.Attributes;

namespace MokaServices.AuthenticationService.Domain;

public interface IBaseEntity
{
    [NanoId]
    string Id { get; set; }
}
