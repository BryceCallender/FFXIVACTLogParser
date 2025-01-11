using Microsoft.AspNetCore.Mvc;

namespace FFXIVACTLogParser.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
