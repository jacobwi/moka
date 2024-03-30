#region

using MokaServices.BytemarksService.Application.DTOs;
using MokaServices.BytemarksService.Domain.Entities;
using MokaServices.BytemarksService.Domain.Interfaces;
using Nelibur.ObjectMapper;

#endregion

namespace MokaServices.BytemarksService.Application;

public class BookmarkService(
    IBookmarkRepository bookmarkRepository,
    ITagRepository tagRepository,
    ICategoryRepository categoryRepository
) : IBookmarkService
{
    public async Task<IEnumerable<BookmarkDto>> GetAllBookmarksAsync()
    {
        var bookmarks = await bookmarkRepository.GetAllAsync();
        return bookmarks.Select(TinyMapper.Map<BookmarkDto>).ToList();
    }

    public async Task<BookmarkDto> GetBookmarkByIdAsync(string id)
    {
        var bookmark = await bookmarkRepository.GetByIdAsync(id);
        if (bookmark == null) throw new KeyNotFoundException("Bookmark not found.");
        return TinyMapper.Map<BookmarkDto>(bookmark);
    }

    public async Task<BookmarkDto> CreateBookmarkAsync(CreateBookmarkDto createBookmarkDto)
    {
        var bookmark = TinyMapper.Map<Bookmark>(createBookmarkDto);

        // Handling tags
        bookmark.Tags = new List<Tag>();
        foreach (var tagName in createBookmarkDto.Tags)
        {
            var tag = await tagRepository.GetByNameAsync(tagName) ?? new Tag { Name = tagName };
            bookmark.Tags.Add(tag);
        }

        // Handling categories
        bookmark.Categories = new List<Category>();
        foreach (var categoryName in createBookmarkDto.Categories)
        {
            var category =
                await categoryRepository.GetByNameAsync(categoryName)
                ?? new Category { Name = categoryName };
            bookmark.Categories.Add(category);
        }

        var createdBookmark = await bookmarkRepository.AddAsync(bookmark);
        return TinyMapper.Map<BookmarkDto>(createdBookmark);
    }

    public async Task<BookmarkDto> UpdateBookmarkAsync(UpdateBookmarkDto updateBookmarkDto)
    {
        var existingBookmark = await bookmarkRepository.GetByIdAsync(updateBookmarkDto.Id);
        if (existingBookmark == null) throw new KeyNotFoundException("Bookmark to update not found.");

        TinyMapper.Map(updateBookmarkDto, existingBookmark);

        // Handle updates to tags and categories as needed...

        var updatedBookmark = await bookmarkRepository.UpdateAsync(existingBookmark);
        return TinyMapper.Map<BookmarkDto>(updatedBookmark);
    }

    public async Task DeleteBookmarkAsync(string id)
    {
        await bookmarkRepository.DeleteAsync(id);
    }
}