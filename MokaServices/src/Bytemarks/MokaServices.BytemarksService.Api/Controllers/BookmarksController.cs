#region

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MokaServices.BytemarksService.Application;
using MokaServices.BytemarksService.Application.DTOs;
using MokaServices.Shared.Models;

#endregion

namespace MokaServices.BytemarksService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookmarksController(IBookmarkService bookmarkService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var bookmarks = await bookmarkService.GetAllBookmarksAsync();
            return Ok(new ApiResponse<List<BookmarkDto>>(true, bookmarks.ToList()));
        }
        catch (Exception e)
        {
            return StatusCode(500, new ApiResponse<object>(false, e.Message));
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        try
        {
            var bookmark = await bookmarkService.GetBookmarkByIdAsync(id);
            return Ok(new ApiResponse<BookmarkDto>(true, bookmark));
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new ApiResponse<object>(false, e.Message));
        }
        catch (Exception e)
        {
            return StatusCode(500, new ApiResponse<object>(false, e.Message));
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateBookmarkDto createBookmarkDto)
    {
        try
        {
            var bookmark = await bookmarkService.CreateBookmarkAsync(createBookmarkDto);
            return CreatedAtAction(nameof(Get), new { id = bookmark.Id }, new ApiResponse<BookmarkDto>(true, bookmark));
        }
        catch (Exception e)
        {
            return StatusCode(500, new ApiResponse<object>(false, e.Message));
        }
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] UpdateBookmarkDto updateBookmarkDto)
    {
        try
        {
            var bookmark = await bookmarkService.UpdateBookmarkAsync(updateBookmarkDto);
            return Ok(new ApiResponse<BookmarkDto>(true, bookmark));
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new ApiResponse<object>(false, e.Message));
        }
        catch (Exception e)
        {
            return StatusCode(500, new ApiResponse<object>(false, e.Message));
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            await bookmarkService.DeleteBookmarkAsync(id);
            return Ok(new ApiResponse<object>());
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(new ApiResponse<object>(false, e.Message));
        }
        catch (Exception e)
        {
            return StatusCode(500, new ApiResponse<object>(false, e.Message));
        }
    }
}