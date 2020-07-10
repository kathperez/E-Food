using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;

namespace EFoodIntranet.Controllers
{
    public class LineaComidaController : ApiController
    {
        // GET: api/LineaComida
        public string Get()
        {
            return new LineaComida().cargarLineaComida();
        }
        public string Post([FromBody] LineaComida lineaComida)
        {
            return lineaComida.agregarLineaComida("Insertar") ? " Se guardó con éxito la línea de comida" : "No se guardó la línea de comida. Recuerde que no pueden haber descripciones duplicadas";

        }
        public HttpResponseMessage Put(string id, [FromBody] LineaComida lineaComida)
        {
            if (lineaComida.modificarLineaComida("Actualizar"))
            {
                var message = string.Format(" Se ha actualizado con exito la linea de comida");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se logró la actualización de la linea de comida, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }

        }
        public HttpResponseMessage Delete(string id, [FromBody] LineaComida lineaComida)
        {
            if (lineaComida.eliminarLineaComida(id))
            {
                var message = string.Format(" Se eliminó la línea de comida");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó línea de comida, verifique los datos verifique los datos y revise asociaciones con productos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
          
        }

    }
}
