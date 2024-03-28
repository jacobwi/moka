using Microsoft.AspNetCore.Mvc;

namespace MokaServices.ApiGateway.Controllers;

public class AggregationController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}