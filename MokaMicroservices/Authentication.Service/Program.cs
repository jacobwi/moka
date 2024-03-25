#region

using System.Text;
using Authentication.Service;
using Authentication.Service.Application;
using Authentication.Service.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

#endregion

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add JWT authentication
// Get JWT preferences from configuration
var jwtConfig = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = jwtConfig["ValidateAudience"] == "true",
            ValidateLifetime = jwtConfig["ValidateLifetime"] == "true",
            ValidateIssuerSigningKey = jwtConfig["ValidateIssuerSigningKey"] == "true",
            ValidIssuer = jwtConfig["Issuer"],
            ValidAudience = jwtConfig["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtConfig["Key"])),
            ClockSkew = TimeSpan.FromMinutes(2),
            RoleClaimType = "role",
            NameClaimType = JwtRegisteredClaimNames.Sub
        };
    });

builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Always place Authentication before Authorization: 
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();