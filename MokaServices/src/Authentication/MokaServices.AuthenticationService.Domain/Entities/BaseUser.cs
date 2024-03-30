#region

using System.ComponentModel.DataAnnotations;
using MokaServices.Shared.Entities;

#endregion

namespace MokaServices.AuthenticationService.Domain.Entities;

public class BaseUser : VersionedBaseEntity
{
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    public bool IsActive { get; set; }

    // Navigation Properties
    public ICollection<BaseRole> UserRoles { get; set; } = [];
    public ICollection<BasePermission> Permissions { get; set; } = [];
}
