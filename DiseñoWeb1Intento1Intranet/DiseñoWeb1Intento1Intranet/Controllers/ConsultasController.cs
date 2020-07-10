using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiseñoWeb1Intento1Intranet.Controllers
{
    public class ConsultasController : Controller
    {
        // GET: Consultas
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Bitacora()
        {
            return View();
        }

        public ActionResult ErroresIntra()
        {
            return View();
        }
        public ActionResult Productos()
        {
            return View();
        }
        public ActionResult Pedidos()
        {
            return View();
        }
    }
}