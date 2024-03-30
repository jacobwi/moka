#region

using Microsoft.EntityFrameworkCore;
using MokaServices.BytemarksService.Domain.Entities;
using MokaServices.BytemarksService.Domain.Interfaces;
using MokaServices.BytemarksService.Infrastructure.Data;

#endregion

namespace MokaServices.BytemarksService.Infrastructure.Repositories;

public class BookmarkRepository(BytemarksDbContext context) : IBookmarkRepository
{
    public async Task<Bookmark> GetByIdAsync(string id)
    {
        return await context
            .Bookmarks.Include(b => b.Tags)
            .Include(b => b.Categories)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<IEnumerable<Bookmark>> GetAllAsync()
    {
        return await context
            .Bookmarks.Include(b => b.Tags)
            .Include(b => b.Categories)
            .ToListAsync();
    }

    public async Task<Bookmark> AddAsync(Bookmark bookmark)
    {
        context.Bookmarks.Add(bookmark);
        await context.SaveChangesAsync();
        return bookmark;
    }

    public async Task<Bookmark> UpdateAsync(Bookmark bookmark)
    {
        context.Entry(bookmark).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return bookmark;
    }

    public async Task DeleteAsync(string id)
    {
        var bookmark = await context.Bookmarks.FindAsync(id);
        if (bookmark != null)
        {
            context.Bookmarks.Remove(bookmark);
            await context.SaveChangesAsync();
        }
    }

    public async Task<Bookmark> GetByNameAsync(string name)
    {
        return await context.Bookmarks.FirstOrDefaultAsync(b => b.Title == name);
    }
}