using Microsoft.AspNetCore.Mvc;

namespace FFXIVACTLogParser.Controllers.Home;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
