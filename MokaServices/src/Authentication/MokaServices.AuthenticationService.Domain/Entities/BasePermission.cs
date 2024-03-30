#region

using System.ComponentModel.DataAnnotations.Schema;
using MokaServices.Shared.Entities;

#endregion

namespace MokaServices.AuthenticationService.Domain.Entities;

public class BasePermission : VersionedBaseEntity
{
    public string Name { get; set; } = string.Empty; // Descriptive name of the permission (e.g., "CreateArticle")
    public string Description { get; set; } = string.Empty; // Detailed description of what the permission allows

    [ForeignKey("RoleId")] public BaseRole Role { get; set; } = null!;

    public override bool Equals(object? obj)
    {
        // If the passed object is null or not a BasePermission instance, they are not equal
        if (obj == null || obj.GetType() != GetType())
            return false;

        var other = (BasePermission)obj;

        // Consider them equal if their names are the same
        return Name == other.Name;
    }

    public override int GetHashCode()
    {
        // If Name could be null, use a constant value or a fallback value's hash code to avoid NullReferenceException
        return Name?.GetHashCode() ?? 0;
    }
}