namespace MokaServices.BytemarksService.Application.DTOs;

public class UpdateBookmarkDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string URL { get; set; }
    public string Description { get; set; }
    public List<string> Tags { get; set; } = new();
    public List<string> Categories { get; set; } = new();
}