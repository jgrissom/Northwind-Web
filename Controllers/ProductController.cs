using Microsoft.AspNetCore.Mvc;
using Northwind.Models;

namespace Northwind.Controllers
{
    public class ProductController : Controller
    {
        // this controller depends on the NorthwindRepository
        private NorthwindContext _northwindContext;
        public ProductController(NorthwindContext db) => _northwindContext = db;
        public IActionResult Category() => View(_northwindContext.Categories);
    }
}
