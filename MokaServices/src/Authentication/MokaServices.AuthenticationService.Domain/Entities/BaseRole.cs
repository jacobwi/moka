#region

#endregion

#region

using MokaServices.Shared.Entities;

#endregion

namespace MokaServices.AuthenticationService.Domain.Entities;

public class BaseRole : VersionedBaseEntity
{
    public required string Name { get; set; } // Descriptive name of the role (e.g., "Editor")
    public ICollection<BasePermission> Permissions { get; set; } = new HashSet<BasePermission>();

    public override bool Equals(object? obj)
    {
        // If the passed object is null or not a BaseRole instance, they are not equal
        if (obj == null || obj.GetType() != GetType())
            return false;

        var other = (BaseRole)obj;

        // Consider them equal if their names are the same
        return Name == other.Name;
    }

    public override int GetHashCode()
    {
        // If Name could be null, use a constant value or a fallback value's hash code to avoid NullReferenceException
        return Name?.GetHashCode() ?? 0;
    }
}