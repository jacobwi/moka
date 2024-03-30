#region

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MokaServices.BytemarksService.Application;
using MokaServices.BytemarksService.Application.Mappings;
using MokaServices.BytemarksService.Infrastructure;
using MokaServices.BytemarksService.Infrastructure.Data;

#endregion

var builder = WebApplication.CreateBuilder(args);

#region Services Configuration

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DI Services
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices();

// Database Context
builder.Services.AddDbContext<BytemarksDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BytemarksDbConnection"))
);

#endregion

#region Swagger Configuration

// Configure Swagger for API documentation
ConfigureSwagger(builder.Services);

#endregion

#region Auth Configuration

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("Jwt");
        options.Authority = jwtSettings["Authority"];
        options.Audience = jwtSettings["Audience"];
        // TODO: Make it environment aware
        // The Authority is the issuer URL of AuthenticationService
        options.Authority = "http://localhost:7269";

        // Audience typically represents the intended recipient of the incoming token or the resource that the token grants access to. It must match the "aud" claim in the tokens.
        options.Audience = "BytemarksService";

        // If auth service and BytemarksService are within the same domain, we might not need to explicitly set the Authority.
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = bool.Parse(jwtSettings["ValidateIssuerSigningKey"]),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"])),
            ValidateIssuer = bool.Parse(jwtSettings["ValidateIssuer"]),
            ValidIssuer = jwtSettings["Issuer"],
            ValidateAudience = bool.Parse(jwtSettings["ValidateAudience"]),
            ValidAudience = jwtSettings["Audience"],
            ValidateLifetime = bool.Parse(jwtSettings["ValidateLifetime"]),
            ClockSkew = TimeSpan.Zero
        };
    });

#endregion


// Initialize TinyMapper mappings
TinyMapperConfig.ConfigureMappings();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.InjectStylesheet("/swagger-ui/theme-flattop.css");
        options.DocumentTitle = "BytemarksService API Documentation";
    });
}

app.UseHttpsRedirection();
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
        options.SwaggerDoc("v1", new OpenApiInfo { Title = "BytemarksService", Version = "v1" });

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