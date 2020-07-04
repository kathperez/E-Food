using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class Consulta_Error_IntranetController : ApiController
    {
        //consultas de intranet
        public string Get(string fecha1, string fecha2)
        {

            return new Error_Intra().carga_lista_erroresRango(fecha1, fecha2);
        }

    }
}
