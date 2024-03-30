#region

using Microsoft.EntityFrameworkCore;
using MokaServices.BytemarksService.Domain;
using MokaServices.BytemarksService.Domain.Entities;
using MokaServices.BytemarksService.Domain.Interfaces;
using MokaServices.BytemarksService.Infrastructure.Data;

#endregion

namespace MokaServices.BytemarksService.Infrastructure.Repositories;

public class TagRepository(BytemarksDbContext context) : ITagRepository
{
    public async Task<Tag> GetByIdAsync(string id)
    {
        return await context.Tags.FindAsync(id);
    }

    public async Task<IEnumerable<Tag>> GetAllAsync()
    {
        return await context.Tags.ToListAsync();
    }

    public async Task<Tag> AddAsync(Tag tag)
    {
        context.Tags.Add(tag);
        await context.SaveChangesAsync();
        return tag;
    }

    public async Task DeleteAsync(string id)
    {
        var tag = await context.Tags.FindAsync(id);
        if (tag != null)
        {
            context.Tags.Remove(tag);
            await context.SaveChangesAsync();
        }
    }

    public async Task<Tag> GetByNameAsync(string name)
    {
        return await context.Tags.FirstOrDefaultAsync(t => t.Name == name);
    }
}