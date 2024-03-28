#region

using Microsoft.Extensions.DependencyInjection;
using MokaServices.AuthenticationService.Application.Interfaces;
using MokaServices.AuthenticationService.Infrastructure.Repositories;
using MokaServices.AuthenticationService.Infrastructure.Services;

#endregion

namespace MokaServices.AuthenticationService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        // Register infrastructure services
        services.AddScoped<ITokenGenerator, TokenGenerator>();
        services.AddScoped<IUserRepository, UserRepository>();


        return services;
    }
}