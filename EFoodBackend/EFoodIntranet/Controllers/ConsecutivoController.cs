using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class ConsecutivoController : ApiController
    {
        // GET: api/Consecutivo

        public string Get()
        {
            return new Consecutivo().cargarConsecutivos();
        }

        // GET: api/Consecutivo/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Consecutivo
        //public string Post([FromBody] Consecutivo consecutivo)
        //{
        //    return consecutivo.agregarConsecutivo("Insertar") ? " Se guardó con éxito el consecutivo" : "No se guardó el consecutivo, verifique la información";
        //}

        public HttpResponseMessage Post([FromBody] Consecutivo consecutivo)
        {
            if (consecutivo.agregarConsecutivo("Insertar"))
            {
                var message = string.Format("Se creó con éxito el consecutivo");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else {
                var message = string.Format("Error al crear el consecutivo, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
             
        }


        //PUT: api/Consecutivo/5
        public string Put(int id, [FromBody] Consecutivo consecutivo)
        {
            return consecutivo.actualizarConsecutivo("Actualizar") ? " Se actualizó con éxito el consecutivo" : "No se actualizó el consecutivo, verifique la información";
        }

        // DELETE: api/Consecutivo/5
        public string Delete(int id_conse, string descripcion, [FromBody] Consecutivo consecutivo)
        {
            return consecutivo.eliminar_consecutivo(id_conse, descripcion) ? "Se eliminó el consecu con éxito" : "No se eliminó el tiquete de descuento";
        }
    }
}
