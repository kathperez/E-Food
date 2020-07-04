using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using DAL;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using Newtonsoft.Json;


namespace EFoodIntranet.Controllers
{
    public class UsuarioController : ApiController
    {
        public string Get()
        {
            return new Usuario().carga_lista_usuarios();
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

      //  POST api/values
        public HttpResponseMessage Post([FromBody] Usuario usuarios)
        {
            if (usuarios.agregar_usuario("Insertar"))
            {
                var message = string.Format("Se creó con éxito el usuario");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("Error al crear el usuario, verifique los datos.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }
        }

        //// PUT api/values/5      
        public HttpResponseMessage Put(string id, [FromBody] Usuario usuarios)
        {
            if (usuarios.modificar_usuario_contrasena("Actualizar")) 
                {
                    var message = string.Format("Se modifico con éxito el usuario");
                    return Request.CreateResponse(HttpStatusCode.OK, message);
                }
            else
                {
                    var message = string.Format("Error al modificar el usuario, verifique los datos.");
                    return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
                }
            }
    }
}
