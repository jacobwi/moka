using MokaServices.BytemarksService.Domain.Entities;

namespace MokaServices.BytemarksService.Domain.Interfaces;

public interface ICategoryRepository
{
    Task<Category> GetByIdAsync(string id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category> AddAsync(Category category);
    Task DeleteAsync(string id);

    Task<Category> GetByNameAsync(string name);
}