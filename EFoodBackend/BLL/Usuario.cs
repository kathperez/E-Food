using System;
using System.Collections.Generic;
using System.Text;
using DAL;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using Newtonsoft.Json;

namespace BLL
{
    public class Usuario
    {
        #region propiedades
        private string _usuario;
        public string usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
        }
        private string _contrasena;
        public string contrasena
        {
            get { return _contrasena; }
            set { _contrasena = value; }
        }

        private string _contrasenaVieja;
        public string contrasenaVieja
        {
            get { return _contrasenaVieja; }
            set { _contrasenaVieja = value; }
        }

        private string _email;
        public string email
        {
            get { return _email; }
            set { _email = value; }
        }
        private string _pregunta;

        public string pregunta
        {
            get { return _pregunta; }
            set { _pregunta = value; }
        }

        private string _respuesta;
        public string respuesta
        {
            get { return _respuesta; }
            set { _respuesta = value; }
        }

        private string _estado;
        public string estado
        {
            get { return _estado; }
            set { _estado = value; }
        }

        private string _usuario_creador;
        public string usuario_creador
        {
            get { return _usuario_creador; }
            set { _usuario_creador = value; }
        }

        private string _accion;
        public string accion
        {
            get { return _accion; }
            set { _accion = value; }
        }



        #endregion

        #region variables privadas
        SqlConnection conexion;
        string mensaje_error;
        int numero_error;
        string sql;
        DataSet ds;
        #endregion

        #region metodos
        public string carga_lista_usuarios()
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                return null;
            }
            else
            {
                sql = "ver_usuario";
                ds = cls_DAL.ejecuta_dataset(conexion, sql, true, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {
                    return null;
                }
                else
                {
                    return JsonConvert.SerializeObject(ds.Tables[0]);
                }
            }

        }

        public bool agregar_usuario(string accion)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                //insertar en la table de errores
                //    HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                return false;
            }
            else
            {
                if (accion.Equals("Insertar"))
                {
                    sql = "crear_usuario";
                }
                ParamStruct[] parametros = new ParamStruct[6];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@usuario", SqlDbType.VarChar, _usuario);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@password", SqlDbType.VarChar, _contrasena);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@email", SqlDbType.VarChar, _email);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@pregunta", SqlDbType.VarChar, _pregunta);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 4, "@respuesta", SqlDbType.VarChar, _respuesta);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 5, "@estado", SqlDbType.VarChar, _estado);               
                cls_DAL.conectar(conexion, ref mensaje_error, ref numero_error);
                cls_DAL.ejecuta_sqlcommand(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {
                    //insertar en la table de errores
                    //HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                    cls_DAL.desconectar(conexion, ref mensaje_error, ref numero_error);
                    return false;
                }
                else
                {
                    cls_DAL.desconectar(conexion, ref mensaje_error, ref numero_error);
                    return true;
                }
            }
        }
        public bool modificar_usuario_contrasena(string accion)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                //insertar en la table de errores
                //    HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                return false;
            }
            else
            {
                if (accion.Equals("Actualizar"))
                {
                    sql = "modificar_usuario_pass_estado";
                }
                ParamStruct[] parametros = new ParamStruct[5];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@usuarioActualizado", SqlDbType.VarChar, _usuario);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@passwordNuevo", SqlDbType.VarChar, _contrasena);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@passwordViejo", SqlDbType.VarChar,_contrasenaVieja);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@estado", SqlDbType.VarChar, _estado);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 4, "@accion", SqlDbType.VarChar, _accion);
                cls_DAL.conectar(conexion, ref mensaje_error, ref numero_error);
                cls_DAL.ejecuta_sqlcommand(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {

                    //HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                    cls_DAL.desconectar(conexion, ref mensaje_error, ref numero_error);
                    return false;
                }
                else
                {
                    cls_DAL.desconectar(conexion, ref mensaje_error, ref numero_error);
                    return true;
                }
            }
        }


        #endregion
    }
}
