namespace MokaServices.AuthenticationService.Domain;

public class VersionedBaseEntity : BaseEntity
{
    public int Version { get; set; }
}