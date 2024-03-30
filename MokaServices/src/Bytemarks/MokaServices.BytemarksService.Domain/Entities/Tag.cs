#region

using System.ComponentModel.DataAnnotations;
using MokaServices.Shared.Attributes;

#endregion

namespace MokaServices.BytemarksService.Domain.Entities;

public class Tag
{
    [Key] [NanoId] public string Id { get; set; }

    [Required] public string Name { get; set; }

    // Navigation property back to Bookmark
    public ICollection<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();
}