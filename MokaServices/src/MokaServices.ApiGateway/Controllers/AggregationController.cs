#region

using Microsoft.AspNetCore.Mvc;

#endregion

namespace MokaServices.ApiGateway.Controllers;

public class AggregationController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}