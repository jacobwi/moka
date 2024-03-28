#region

using System.ComponentModel.DataAnnotations;

#endregion

namespace MokaServices.AuthenticationService.Domain.Entities;

public class BaseRole : VersionedBaseEntity
{
    [Key] public Guid Id { get; set; } // Unique identifier for the role

    public required string Name { get; set; } // Descriptive name of the role (e.g., "Editor")
    public ICollection<BasePermission> Permissions { get; set; } = new List<BasePermission>();
}