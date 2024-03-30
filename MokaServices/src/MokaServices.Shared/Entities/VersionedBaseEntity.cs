namespace MokaServices.Shared.Entities;

public class VersionedBaseEntity : BaseEntity
{
    public int Version { get; set; }
}
