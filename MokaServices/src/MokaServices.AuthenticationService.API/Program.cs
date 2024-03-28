#region

using Microsoft.EntityFrameworkCore;
using MokaServices.AuthenticationService.Application;
using MokaServices.AuthenticationService.Infrastructure;
using MokaServices.AuthenticationService.Infrastructure.Data;
using MokaServices.Shared.Services;

#endregion

var builder = WebApplication.CreateBuilder(args);

// Services
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();
