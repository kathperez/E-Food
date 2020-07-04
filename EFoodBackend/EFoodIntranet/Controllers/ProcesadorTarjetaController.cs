using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;


namespace EFoodIntranet.Controllers
{
    public class ProcesadorTarjetaController : ApiController
    {
        public string Get(string id)
        {
            return new ProcesadorTarjeta().cargarProcesadorTarjeta(id);
        }

        // POST api/values        
        public HttpResponseMessage Post([FromBody] ProcesadorTarjeta procesadorTarjeta)
        {
             if (procesadorTarjeta.agregarProcesadorTarjeta("Insertar"))
            {
                var message = string.Format("  Se guardó la tarjeta en el procesador");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó la tarjeta en el procesador, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        }


        // DELETE api/values/5      
        public HttpResponseMessage Delete(string tipoTarjeta, string tipoProcesador, [FromBody] ProcesadorTarjeta procesadorTarjeta)
        {
            if (procesadorTarjeta.eliminarProcesadorTarjeta(tipoTarjeta, tipoProcesador))
            {
                var message = string.Format("Se eliminó la tarjeta del procesador con éxito");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó la tarjeta del procesador, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        }
    }
}
