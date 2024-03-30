#region

using System.ComponentModel.DataAnnotations;
using MokaServices.Shared.Entities;

#endregion

namespace MokaServices.BytemarksService.Domain.Entities;

public class Bookmark : BaseEntity // Assuming BaseEntity contains common properties like Id, CreatedAt, etc.
{
    [Required] public string Title { get; set; }

    [Required] public string URL { get; set; }

    public string Description { get; set; }

    // Relationships
    public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    public ICollection<Category> Categories { get; set; } = new List<Category>();
}