using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;


namespace EFoodIntranet.Controllers
{
    public class UsuarioRolController : ApiController
    {
        //Controlador de usuario rol
        // GET: api/UsuarioRol
        public string Get(string id)
        {
            return new UsuarioRol().carga_lista_usuarios_rol(id);
        }

        // POST api/values     
        public HttpResponseMessage Post([FromBody] UsuarioRol usuario_rol)
        {

            if (usuario_rol.agregar_usuario_rol("Insertar"))
            {
                var message = string.Format("Se guardó el rol en el usuario");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se guardó el rol en el usuario.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }

        }
        //Delete
        public HttpResponseMessage Delete(int rol_cod, string nom_usu, [FromBody] UsuarioRol usuario_rol)
        {
            if (usuario_rol.elimina_usuario_rol(rol_cod, nom_usu))
            {
                var message = string.Format("Se eliminó el rol del usuario");
                return Request.CreateResponse(HttpStatusCode.OK, message);
            }
            else
            {
                var message = string.Format("No se eliminó el rol del usuario.");
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, message);
            }


        }


    }
}
