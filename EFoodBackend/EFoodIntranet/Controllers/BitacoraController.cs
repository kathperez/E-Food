using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class BitacoraController : ApiController
    {
        // GET: api/Bitacora
        public string Get(string fecha1, string fecha2, string usuario)
        {
            return new Bitacora().carga_lista_Bitacora(fecha1, fecha2, usuario);
        
        }
    }
}
