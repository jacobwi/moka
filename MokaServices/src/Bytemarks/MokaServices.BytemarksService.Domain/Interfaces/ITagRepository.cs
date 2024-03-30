#region

using MokaServices.BytemarksService.Domain.Entities;

#endregion

namespace MokaServices.BytemarksService.Domain.Interfaces;

public interface ITagRepository
{
    Task<Tag> GetByIdAsync(string id);
    Task<IEnumerable<Tag>> GetAllAsync();
    Task<Tag> AddAsync(Tag tag);
    Task DeleteAsync(string id);

    Task<Tag> GetByNameAsync(string name);
}