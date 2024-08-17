using LibraryManagementAPI.Data;
using LibraryManagementAPI.Services.Contracts;
using LibraryManagementAPI.Services.Implementations;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;

        builder.Services.AddDbContext<LibraryDbContext>(options =>
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddTransient<ILibrarianService, LibrarianService>();
        builder.Services.AddTransient<IBorrowerService, BorrowerService>();

        var app = builder.Build();


        using (var scope = app.Services.CreateScope())
        {
            var dataContext = scope.ServiceProvider.GetRequiredService<LibraryDbContext>();
            dataContext.Database.Migrate();
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(options => options
           .SetIsOriginAllowed(x => _ = true)
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials());

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}