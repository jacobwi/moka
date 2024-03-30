#region

using Microsoft.EntityFrameworkCore;
using MokaServices.BytemarksService.Domain.Entities;

#endregion

namespace MokaServices.BytemarksService.Infrastructure.Data;

public class BytemarksDbContext(DbContextOptions<BytemarksDbContext> options) : DbContext(options)
{
    public DbSet<Bookmark> Bookmarks { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuring the many-to-many relationship for Bookmark and Tag
        modelBuilder
            .Entity<Bookmark>()
            .HasMany(b => b.Tags)
            .WithMany(t => t.Bookmarks)
            .UsingEntity(j => j.ToTable("BookmarkTags"));

        // Configuring the many-to-many relationship for Bookmark and Category
        modelBuilder
            .Entity<Bookmark>()
            .HasMany(b => b.Categories)
            .WithMany(c => c.Bookmarks)
            .UsingEntity(j => j.ToTable("BookmarkCategories"));
    }
}