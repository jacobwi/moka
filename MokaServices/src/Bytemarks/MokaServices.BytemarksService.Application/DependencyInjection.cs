#region

using Microsoft.Extensions.DependencyInjection;

#endregion

namespace MokaServices.BytemarksService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Register application layer services
        services.AddScoped<IBookmarkService, BookmarkService>();

        return services;
    }
}