using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class PrecioProductoController : ApiController
    {
        public string Get(string id)
        {
            return new PrecioProducto().cargar_PrecioProducto(id);
        }

        // POST api/values      
        public HttpResponseMessage Post([FromBody] PrecioProducto precioProducto)
        {
           
            if (precioProducto.agregarPrecioProducto("Insertar"))
            {
                var message = string.Format("Se guardó el precio en el producto");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó el precio en el producto, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }

        }

        // PUT api/values/5 
        public HttpResponseMessage Put(string id, [FromBody] PrecioProducto precio_Producto)
        {
          
            if (precio_Producto.modificarPrecioProducto("Actualizar"))
            {
                var message = string.Format("Se actualizó el precio del producto");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se actualizó precio del producto, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        }
        // DELETE api/values/5     
        public HttpResponseMessage Delete(string idCod, [FromBody] PrecioProducto precioProducto)
        {
           
            if (precioProducto.eliminarPrecioProducto(idCod))
            {
                var message = string.Format("Se eliminó el precio del producto");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó el precio del producto, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        }
    }
}
