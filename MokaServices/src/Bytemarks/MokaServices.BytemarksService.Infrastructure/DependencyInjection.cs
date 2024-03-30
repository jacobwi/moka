#region

using Microsoft.Extensions.DependencyInjection;
using MokaServices.BytemarksService.Domain;
using MokaServices.BytemarksService.Domain.Interfaces;
using MokaServices.BytemarksService.Infrastructure.Repositories;

#endregion

namespace MokaServices.BytemarksService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        // Register infrastructure repositories
        services.AddScoped<IBookmarkRepository, BookmarkRepository>();
        services.AddScoped<ITagRepository, TagRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();

        return services;
    }
}