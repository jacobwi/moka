using System.ComponentModel.DataAnnotations;

namespace SharedLibrary;

public class UserDto
{

    public string UserId { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 50 characters.")]
    public string Username { get; set; }
    [Required]
    [EmailAddress(ErrorMessage = "Invalid Email Address.")]
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}