namespace MokaServices.AuthenticationService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Register application layer services
        services.AddScoped<IAuthenticationService, Services.AuthenticationService>();

        return services;
    }
}