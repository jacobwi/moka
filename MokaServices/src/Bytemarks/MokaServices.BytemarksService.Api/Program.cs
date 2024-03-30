#region

using Microsoft.EntityFrameworkCore;
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

// Initialize TinyMapper mappings
TinyMapperConfig.ConfigureMappings();

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
