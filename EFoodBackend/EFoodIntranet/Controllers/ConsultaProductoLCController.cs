using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class ConsultaProductoLCController : ApiController
    {
        // GET: api/ConsultaProductoLC
        public string Get(string lineaComida)
        {
            return new ConsultaProducto().carga_lista_ProductoLC(lineaComida);
        }
       
    }
}
