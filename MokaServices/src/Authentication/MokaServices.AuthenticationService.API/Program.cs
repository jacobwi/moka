#region

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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


#region Route Options Configuration

ConfigureRouteOptions(builder.Services);

#endregion

#region Swagger Configuration

// Configure Swagger for API documentation
ConfigureSwagger(builder.Services);

#endregion

#region Shared Services Configuration

// Add shared services
builder.Services.AddSingleton<ErrorCodeService>();

#endregion

#region Auth Configuration

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("Jwt");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = jwtSettings.GetValue<bool>("ValidateIssuerSigningKey"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"])),
            ValidateIssuer = jwtSettings.GetValue<bool>("ValidateIssuer"),
            ValidateAudience = jwtSettings.GetValue<bool>("ValidateAudience"),
            ValidateLifetime = jwtSettings.GetValue<bool>("ValidateLifetime"),
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            ClockSkew = TimeSpan.FromMinutes(jwtSettings.GetValue<int>("ClockSkew"))
        };
    });

// Authorization
// Get the RoleService from the DI container
builder.Services.AddSingleton<RoleService>();
var roleService = builder.Services.BuildServiceProvider().GetService<RoleService>();
builder.Services.AddAuthorization(options =>
{
    // Add a policy for each role
    foreach (var role in roleService!.GetAllRoles())
        options.AddPolicy(role.Name, policy => policy.RequireRole(role.Name));
});

#endregion

#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.InjectStylesheet("/swagger-ui/theme-flattop.css");
    });
}

app.UseHttpsRedirection();

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.UseStaticFiles();
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

#region Route Options Configuration Method

static void ConfigureRouteOptions(IServiceCollection services)
{
    services.Configure<RouteOptions>(options =>
    {
        options.LowercaseUrls = true; // Generate lowercase urls
    });
}

#endregion