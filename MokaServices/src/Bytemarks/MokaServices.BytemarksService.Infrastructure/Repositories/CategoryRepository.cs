#region

using Microsoft.EntityFrameworkCore;
using MokaServices.BytemarksService.Domain;
using MokaServices.BytemarksService.Domain.Entities;
using MokaServices.BytemarksService.Domain.Interfaces;
using MokaServices.BytemarksService.Infrastructure.Data;

#endregion

namespace MokaServices.BytemarksService.Infrastructure.Repositories;

public class CategoryRepository(BytemarksDbContext context) : ICategoryRepository
{
    public async Task<Category> GetByIdAsync(string id)
    {
        return await context.Categories.FindAsync(id);
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await context.Categories.ToListAsync();
    }

    public async Task<Category> AddAsync(Category category)
    {
        context.Categories.Add(category);
        await context.SaveChangesAsync();
        return category;
    }

    public async Task DeleteAsync(string id)
    {
        var category = await context.Categories.FindAsync(id);
        if (category != null)
        {
            context.Categories.Remove(category);
            await context.SaveChangesAsync();
        }
    }

    public async Task<Category> GetByNameAsync(string name)
    {
        return await context.Categories.FirstOrDefaultAsync(c => c.Name == name);
    }
}