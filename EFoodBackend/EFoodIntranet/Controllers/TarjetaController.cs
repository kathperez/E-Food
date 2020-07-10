using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;



namespace EFoodIntranet.Controllers
{
    public class TarjetaController : ApiController
    {
        // GET api/values      
        public string Get()
        {
            return new Tarjeta().carga_Tarjetas();
        }

        // GET api/values/5      
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values       
        public HttpResponseMessage Post([FromBody] Tarjeta tarjeta)
        {
            if (tarjeta.agregarTarjeta("Insertar"))
            {
                var message = string.Format("Se guardó con éxito la tarjeta");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó la tarjeta, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
          

        }

        // PUT api/values/5
        public HttpResponseMessage Put(string id, [FromBody] Tarjeta tarjeta)
        {
            if (tarjeta.modificarTarjeta("Actualizar"))
            {
                var message = string.Format("Se actualizó la tarjeta con éxito");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se actcualizó la tarjeta, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        }

        // DELETE api/values/5        
        public HttpResponseMessage Delete(string id, [FromBody] Tarjeta tarjeta)
        {
            if (tarjeta.eliminarTarjeta(id))
            {
                var message = string.Format("Se eliminó la tarjeta");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó la tarjeta, verifique los datos y su asociación con procesadores.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);            }
           
        }
    }
}
