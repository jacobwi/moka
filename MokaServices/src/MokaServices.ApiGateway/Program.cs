#region

using Ocelot.DependencyInjection;
using Ocelot.Middleware;

#endregion

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.DocumentTitle = "MokaServices API Gateway Documentation";
    });
}

app.UseHttpsRedirection();

// Use Ocelot middleware
app.UseOcelot().Wait();

app.Run();