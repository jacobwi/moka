namespace MokaServices.Shared.DTOs;

public class BaseUserDto
{
    public string Username { get; set; }

    public string Email { get; set; }
    // Potentially Roles, Permissions, etc.
}