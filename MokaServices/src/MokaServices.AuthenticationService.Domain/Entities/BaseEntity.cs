namespace MokaServices.AuthenticationService.Domain;

public class BaseEntity : IBaseEntity
{
    public string Id { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime? LastModifiedDate { get; set; }
    public Guid? LastModifiedBy { get; set; }
}
