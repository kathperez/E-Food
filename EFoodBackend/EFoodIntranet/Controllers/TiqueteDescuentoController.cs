using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class TiqueteDescuentoController : ApiController
    {
        // GET api/values       
        public string Get()
        {
            return new TiqueteDescuento().cargaTiquetes();
        }

        //// GET api/values/5       
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/values       
        public HttpResponseMessage Post([FromBody] TiqueteDescuento tiquete_descuento)
        {
            if (tiquete_descuento.agregar_tiquete_descuento("Insertar"))
            {
                var message = string.Format("Se guardó con éxito el tiquete de descuento");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó el el tiquete de descuento, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }          

        }

        //// PUT api/values/5       
        public HttpResponseMessage Put(string id, [FromBody] TiqueteDescuento tiquete_descuento)
        {
            if (tiquete_descuento.modificar_tiquete_descuento("Actualizar"))
            {
                var message = string.Format("Se actualizó con éxito el tiquete de descuento");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se actualizó el tiquete de descuento, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        
        }

        //// DELETE api/values/5      
        public HttpResponseMessage Delete(string id, [FromBody] TiqueteDescuento tiquete_descuento)
        {
            if (tiquete_descuento.eliminarTiqueteDescuento(id))
            {
                var message = string.Format("Se eliminó el tiquete de descuento");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó el tiquete de descuento, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
           
        }
    }
}
