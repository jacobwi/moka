namespace MokaServices.AuthenticationService.Domain.Exceptions;

public class DetailedArgumentNullException(string parameterName, object? value = null, string? detail = null)
    : ArgumentNullException(parameterName, FormatMessage(parameterName, value, detail))
{
    public string ParameterName { get; } = parameterName;
    public object? Value { get; } = value;
    public string? Detail { get; } = detail;

    private static string FormatMessage(string parameterName, object? value, string? detail)
    {
        return $"""

                Parameter Name: {parameterName}

                Provided Value: {value ?? "null"}

                Detail: {detail}
                """;
    }
}