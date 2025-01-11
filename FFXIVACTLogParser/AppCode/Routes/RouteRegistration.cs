namespace FFXIVACTLogParser.AppCode.Routes
{
    public static class RouteRegistration
    {
        public static IEndpointRouteBuilder UseRoutes(this IEndpointRouteBuilder app)
        {
            HomeRoutes.Register(app);

            return app;
        }
    }
}
