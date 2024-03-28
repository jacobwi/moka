using System.ComponentModel.DataAnnotations;
using MokaServices.Shared.Attributes;
using MokaServices.Shared.Models;

namespace MokaServices.AuthenticationService.Domain.Entities;

public class BaseUser : VersionedBaseEntity
{
    public BaseUser() =>
        // Only generate a new ID if one hasn't been set
        Id = Id ?? NanoId.Generate();

    [Key]
    [NanoId]
    public string Id { get; set; }

    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PasswordHash { get; set; }
    public bool IsActive { get; set; }

    // Navigation Properties
    public ICollection<BaseRole> UserRoles { get; set; }
    public ICollection<BasePermission> Permissions { get; set; } = new List<BasePermission>();
}
