#region

#endregion

namespace MokaServices.AuthenticationService.Domain.Entities;

public class BaseRole : VersionedBaseEntity
{
    public required string Name { get; set; } // Descriptive name of the role (e.g., "Editor")
    public ICollection<BasePermission> Permissions { get; set; } = new List<BasePermission>();
}