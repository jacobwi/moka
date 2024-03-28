namespace SharedLibrary.DTOs;

public class UserDto
{
    public string Token { get; set; }
    public DateTime ExpiresAt { get; set; }
    public UserDto User { get; set; }           /* Navigation property */
}