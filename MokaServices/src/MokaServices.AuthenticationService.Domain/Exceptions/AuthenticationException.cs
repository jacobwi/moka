namespace MokaServices.AuthenticationService.Domain.Exceptions;

public class AuthenticationException(string message, string? detail = null, string? contextInfo = null)
    : Exception(message)
{
    private string? Detail { get; } = detail;

    private string? ContextInfo { get; } = contextInfo;

    public override string ToString()
    {
        return $"""
                Exception: {GetType().Name}
                Message: {Message}
                Detail: {Detail}
                Context: {ContextInfo}
                """;
    }
}