namespace MokaServices.Shared.Models;

public class ErrorCode
{
    public string Code { get; set; } 
    public string Message { get; set; }
    public int HttpStatus { get; set; }
}