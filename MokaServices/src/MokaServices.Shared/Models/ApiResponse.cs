#region

#endregion

namespace MokaServices.Shared.Models;

public class ApiResponse<T>(
    bool success = true,
    T? data = default,
    string? message = null,
    List<string>? errors = null)
{
    public bool Success { get; set; } = success;

    public string? Message { get; set; } = message;
    public List<string>? Errors { get; set; } = errors;
    public T? Data { get; set; } = data;
}