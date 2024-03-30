#region

using MokaServices.Shared.Attributes;

#endregion

namespace MokaServices.Shared.Entities;

public interface IBaseEntity
{
    [NanoId] string Id { get; set; }
}