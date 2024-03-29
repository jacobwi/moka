#region

using System.ComponentModel.DataAnnotations.Schema;

#endregion

namespace MokaServices.AuthenticationService.Domain.Entities;

public class BasePermission : VersionedBaseEntity
{
    public string Name { get; set; } // Descriptive name of the permission (e.g., "CreateArticle")
    public string Description { get; set; } // Detailed description of what the permission allows

    [ForeignKey("RoleId")] public BaseRole Role { get; set; }
}