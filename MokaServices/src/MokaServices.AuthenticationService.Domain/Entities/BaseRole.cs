namespace MokaServices.AuthenticationService.Domain.Entities;

public class BaseRole : VersionedBaseEntity
{
    public Guid Id { get; set; } // Unique identifier for the role
    public required string Name { get; set; } // Descriptive name of the role (e.g., "Editor")
    public ICollection<BasePermission> Permissions { get; set; } = new List<BasePermission>(); // Collection of permissions associated with the role

}