#region

#endregion

#region

using ByteBookmarks.Application.Users.DTOs;

#endregion

namespace ByteBookmarks.Application.Users.Commands;

public class LoginUserCommand : IRequest<AuthenticationResponse>
{
    public string Username { get; set; }
    public string Password { get; set; }
}