#region

using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

#endregion

var builder = WebApplication.CreateBuilder(args);


// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Add Swagger generator

builder.Services.AddOcelot(builder.Configuration);


builder.Configuration.AddJsonFile("ocelot.json", false, true);

// Configure CORS
builder.Services
    .AddCors(options =>
    {
        options.AddPolicy("CorsPolicy", policy =>
        {
            policy
                .WithOrigins(builder.Configuration.GetSection("CORS:Origins").Get<string[]>() ?? [])
                .AllowAnyMethod()
                .AllowCredentials()
                .AllowAnyHeader()
                .SetIsOriginAllowedToAllowWildcardSubdomains();
        });
    });

// Add health checks
builder.Services
    .AddHealthChecks()
    .AddCheck("self", () => HealthCheckResult.Healthy(), ["live"]);


var app = builder.Build();


// Minimal endpoint for the root path to confirm the API Gateway is running
app.MapGet("/", () => "API Gateway is running.");
app.MapGet("/config", (IConfiguration config) =>
{
    // This is just an example. Be careful with exposing sensitive configuration details.
    var ocelotConfig = config.GetSection("Routes").Get<List<dynamic>>();
    return Results.Ok(ocelotConfig);
});

// Configure Swagger middleware
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Ocelot API Gateway V1");
    options.RoutePrefix = "swagger"; // Swagger UI endpoint (e.g., '/swagger')
});
// Middleware pipeline configuration
app.UseHttpsRedirection(); // Redirect HTTP requests to HTTPS
app.UseRouting(); // Enable routing
app.UseEndpoints(_ => { }); // Minimal routing configuration


// Map health check endpoints
app.MapHealthChecks("/hc", new HealthCheckOptions
{
    Predicate = _ => true,
    ResponseWriter = WriteResponse
});

app.MapHealthChecks("/live", new HealthCheckOptions
{
    Predicate = r => r.Name.Contains("self")
});

app.UseCors("AllowSpecificOrigin");
// Use Ocelot middleware in the pipeline
await app.UseOcelot();

// Endpoint routing for controllers
// This replaces the redundant app.MapControllers() call and organizes it within app.UseEndpoints
app.MapControllers();


app.Run();


static Task WriteResponse(HttpContext context, HealthReport healthReport)
{
    context.Response.ContentType = "application/json; charset=utf-8";

    var options = new JsonWriterOptions { Indented = true };

    using var memoryStream = new MemoryStream();
    using (var jsonWriter = new Utf8JsonWriter(memoryStream, options))
    {
        jsonWriter.WriteStartObject();
        jsonWriter.WriteString("status", healthReport.Status.ToString());
        jsonWriter.WriteStartObject("results");

        foreach (var healthReportEntry in healthReport.Entries)
        {
            jsonWriter.WriteStartObject(healthReportEntry.Key);
            jsonWriter.WriteString("status",
                healthReportEntry.Value.Status.ToString());
            jsonWriter.WriteString("description",
                healthReportEntry.Value.Description);
            jsonWriter.WriteStartObject("data");

            foreach (var item in healthReportEntry.Value.Data)
            {
                jsonWriter.WritePropertyName(item.Key);

                JsonSerializer.Serialize(jsonWriter, item.Value,
                    item.Value.GetType());
            }

            jsonWriter.WriteEndObject();
            jsonWriter.WriteEndObject();
        }

        jsonWriter.WriteEndObject();
        jsonWriter.WriteEndObject();
    }

    return context.Response.WriteAsync(
        Encoding.UTF8.GetString(memoryStream.ToArray()));
}