using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MokaServices.AuthenticationService.Domain.Entities;

public class BasePermission : VersionedBaseEntity
{
    [Key]
    public Guid RoleId { get; set; } // Unique identifier for the permission
    public string Name { get; set; } // Descriptive name of the permission (e.g., "CreateArticle")
    public string Description { get; set; } // Detailed description of what the permission allows

    [ForeignKey("RoleId")]
    public BaseRole Role { get; set; }
}
