using Microsoft.AspNetCore.Mvc;

namespace Northwind.Controllers
{
    public class CustomerController : Controller
    {
        public IActionResult Register() => View();
    }
}
