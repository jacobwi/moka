#region

using MokaServices.BytemarksService.Domain.Entities;

#endregion

namespace MokaServices.BytemarksService.Domain.Interfaces;

public interface IBookmarkRepository
{
    Task<Bookmark> GetByIdAsync(string id);
    Task<IEnumerable<Bookmark>> GetAllAsync();
    Task<Bookmark> AddAsync(Bookmark bookmark);
    Task<Bookmark> UpdateAsync(Bookmark bookmark);
    Task DeleteAsync(string id);
    Task<Bookmark> GetByNameAsync(string name);
}