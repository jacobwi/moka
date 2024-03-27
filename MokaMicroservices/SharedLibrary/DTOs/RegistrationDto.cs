using System.ComponentModel.DataAnnotations;

namespace SharedLibrary.DTOs;

public class RegistrationDto
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]

    [StringLength(100, MinimumLength = 6)]
    public string Password { get; set; }

    [Compare("Password", ErrorMessage = "Passwords do not match.")]
    public string ConfirmPassword { get; set; }

    [Required]
    [RegularExpression("True|False", ErrorMessage = "Terms must be accepted.")]
    public bool TermsAccepted { get; set; }

    // Optional: Captcha field for bot protection
    // ! This field is not required for registration but can be used for additional security
    // ! Handle the captcha validation in the controller
    public string CaptchaToken { get; set; }

    // Optional: Fields for additional user information
    [StringLength(100)]
    public string FirstName { get; set; }

    [StringLength(100)]
    public string LastName { get; set; }

    // Optional: To handle user's consent for receiving newsletters, marketing emails, etc.
    public bool? SubscribeToNewsletter { get; set; }

}