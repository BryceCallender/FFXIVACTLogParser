namespace FFXIVACTLogParser.AppCode.Routes
{
    public static class HomeRoutes
    {
        public static IEndpointRouteBuilder Register(this IEndpointRouteBuilder app)
        {
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            return app;
        }
    }
}
