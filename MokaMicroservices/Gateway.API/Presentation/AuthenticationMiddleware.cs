namespace Gateway.API;

public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthenticationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Extract token from header
        // 2. Validate token (potentially call Authentication.Service)
        // 3. If valid, set user identity on context
        // 4. If invalid, return appropriate error response

        await _next(context);
    }
}