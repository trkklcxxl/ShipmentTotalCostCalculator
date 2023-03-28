using Microsoft.AspNetCore.Mvc;

namespace ShipmentTotalCostCalculator.Controllers
{
    public class ShipmentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult MyAction()
        {
            string myInputValue = Request.Form["txt-place"];

            // Form verilerini işleme kodu buraya gelecek
            Console.WriteLine(myInputValue);
            return View();

            
        }
    }
}
