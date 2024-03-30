#region

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MokaServices.AuthenticationService.Domain.Exceptions;

#endregion

namespace MokaServices.AuthenticationService.API.Filters;

public class ApiExceptionFilter : IExceptionFilter
{
    private readonly ILogger<ApiExceptionFilter> _logger;

    public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        // Log the exception
        _logger.LogError(context.Exception, "Unhandled exception occurred.");

        switch (context.Exception)
        {
            // Handle different types of exceptions or use a default handler
            case UnauthorizedAccessException:
                context.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Result = new JsonResult(new ErrorResponse(context.Exception)
                    { Message = "Unauthorized access." });
                break;
            // Replace with your custom exception
            case AuthenticationException:
                context.HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Result = new JsonResult(new ErrorResponse(context.Exception)
                    { Message = "A custom error occurred." });
                break;
            default:
                // For unhandled errors
                context.HttpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Result = new JsonResult(new ErrorResponse(context.Exception)
                    { Message = "An unexpected error occurred." });
                break;
        }

        context.ExceptionHandled = true; // Mark exception as handled
    }
}

public class ErrorResponse
{
    public ErrorResponse(Exception ex)
    {
        Message = ex.Message;
        Detail = ex.InnerException?.Message;
    }

    public string Message { get; set; }
    public string Detail { get; set; }
}