#region

using System.ComponentModel.DataAnnotations;
using MokaServices.Shared.Attributes;
using MokaServices.Shared.Models;

#endregion

namespace MokaServices.AuthenticationService.Domain;

public class BaseEntity : IBaseEntity
{
    public BaseEntity()
    {
        Id = Id ?? NanoId.Generate();
        CreatedDate = CreatedDate ?? DateTime.UtcNow;
    }

    private DateTime? CreatedDate { get; }
    public Guid CreatedBy { get; set; }
    public DateTime? LastModifiedDate { get; set; }
    public DateTime? LastModifiedBy { get; set; }

    [NanoId] [Key] public string Id { get; set; }
}