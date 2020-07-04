using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class ProcesadorController : ApiController
    {
        // GET api/values     
        public string Get()
        {
            return new Procesadores().carga_Procesadores();
        }

        // GET api/values/5       
        public string Get(int id)
        {
            return "value";
        }

        //POST api/values
        public HttpResponseMessage Post([FromBody] Procesadores procesador)
        {
            if (procesador.agregarProcesador("Insertar"))
            {
                var message = string.Format(" Se guardó con éxito el procesador de pago");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó el procesador de pago, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
           

        }

        // PUT api/values/5       
        public HttpResponseMessage Put(int id, [FromBody] Procesadores procesador)
        {
            
            if (procesador.modificarProcesador("Actualizar"))
            {
                var message = string.Format("Se ha actualizado con exito el procesador_pago");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se actualizó el procesador de pago, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }


        }

        // DELETE api/values/5     
        public HttpResponseMessage Delete(string id, [FromBody] Procesadores procesador)
        {
            if (procesador.eliminarProcesadorPago(id))
            {
                var message = string.Format("Se eliminó el procesador de pago");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó el procesador de pago, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
            
        }
    }
}
