using Microsoft.Extensions.DependencyInjection;
using Sqids;

namespace Platform.Core.DI;

public static class AttributeScanner
{
    public static void RegisterDependencyInjection(this IServiceCollection services)
    {
        services.Scan(selector => selector
            .FromCallingAssembly()
            .AddClasses(c => c.WithAttribute<AddScoped>())
            .AsImplementedInterfaces()
            .WithScopedLifetime()
        );

        services.AddSingleton(new SqidsEncoder<long>(new()
        {
            MinLength = 8
        }));
    }
}
