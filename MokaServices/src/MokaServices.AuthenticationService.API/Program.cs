#region Usings

using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MokaServices.AuthenticationService.Application;
using MokaServices.AuthenticationService.Infrastructure;
using MokaServices.AuthenticationService.Infrastructure.Data;
using MokaServices.Shared.Services;

#endregion

var builder = WebApplication.CreateBuilder(args);

#region Services Configuration

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Caching
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<ErrorCodeService>();


// DI Services
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices();

// Database Context
builder.Services.AddDbContext<AuthenticationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("AuthenticationDatabase"))
);

#region Swagger Configuration

// Configure Swagger for API documentation
ConfigureSwagger(builder.Services);

#endregion

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();


#region Swagger Configuration Method

static void ConfigureSwagger(IServiceCollection services)
{
    services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo { Title = "AuthenticationService", Version = "v1" });

        // Configure for JWT Bearer authentication (if you're using it)
        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme.",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        options.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header
                },
                new List<string>()
            }
        });
    });
}
#endregion