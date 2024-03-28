namespace MokaServices.AuthenticationService.Domain.Entities;

public class BasePermission : VersionedBaseEntity
{
    public Guid Id { get; set; } // Unique identifier for the permission
    public string Name { get; set; } // Descriptive name of the permission (e.g., "CreateArticle")
    public string Description { get; set; } // Detailed description of what the permission allows
}
