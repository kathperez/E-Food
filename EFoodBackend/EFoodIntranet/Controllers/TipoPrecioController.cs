using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class TipoPrecioController : ApiController
    {
        // GET api/values   
        public string Get()
        {
            return new TipoPrecio().cargaPrecios();
        }

        // POST api/values       
        public HttpResponseMessage Post([FromBody] TipoPrecio tipoPrecio)
        {
            if (tipoPrecio.agregarTipoPrecio("Insertar"))
            {
                var message = string.Format("Se guardó con éxito el tipo de precio");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó el tipo de precio, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        }
        // PUT api/values/5      
        public HttpResponseMessage Put(string id, [FromBody] TipoPrecio tipoPrecio)
        {
            if (tipoPrecio.modificar_precio("Actualizar"))
            {
                var message = string.Format("Se actualizó el tipo precio con éxito");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se actcualizó el tipo precio, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }          
        }

        // DELETE api/values/5       
        public HttpResponseMessage Delete(string id, [FromBody] TipoPrecio tipoPrecio)
        {
            if (tipoPrecio.eliminarPrecio(id))
            {
                var message = string.Format("Se eliminó el tipo precio");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó el tipo precio, verifique los datos y revise asociaciones con productos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
          
        }
    }
}
