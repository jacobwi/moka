#region

using MokaServices.BytemarksService.Application.DTOs;

#endregion

namespace MokaServices.BytemarksService.Application;

public interface IBookmarkService
{
    Task<BookmarkDto> GetBookmarkByIdAsync(string id);
    Task<IEnumerable<BookmarkDto>> GetAllBookmarksAsync();
    Task<BookmarkDto> CreateBookmarkAsync(CreateBookmarkDto createBookmarkDto);
    Task<BookmarkDto> UpdateBookmarkAsync(UpdateBookmarkDto updateBookmarkDto);
    Task DeleteBookmarkAsync(string id);
}