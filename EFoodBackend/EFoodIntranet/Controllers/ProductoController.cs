using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class ProductoController : ApiController
    {
        // GET api/values       
        public string Get()
        {
            return new Productos().carga_lista_Productos();
        }

     
        // POST api/values      
        public HttpResponseMessage Post([FromBody] Productos productos)
        {
           if (productos.agregarProducto("Insertar"))
            {
                var message = string.Format("Se guardó con éxito el producto");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó el producto, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        }

        // PUT api/values/5       
        public HttpResponseMessage Put(string id, [FromBody] Productos productos)
        {
            if (productos.modificarProducto("Actualizar"))
            {
                var message = string.Format("Se guardó con éxito el producto");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó el producto, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }

        
        }
        // DELETE api/values/5       
        public HttpResponseMessage Delete(string id, [FromBody] Productos productos)
        {
            if (productos.eliminarProducto(id))
            {
                var message = string.Format("Se eliminó el producto con éxito");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó el producto, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
          
        }
    }
}
