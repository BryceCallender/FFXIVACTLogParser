using FFXIVACTLogParser.AppCode.Routes;
using Vite.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddRazorPages();
builder.Services.AddViteServices(options =>
{
    options.Server.AutoRun = true;
    options.Server.Https = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

app.UseRoutes();

if (app.Environment.IsDevelopment())
{
    app.UseWebSockets();
    app.UseViteDevelopmentServer();
}

app.Run();
