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
    public class UsuarioRol
    {
        #region propiedades
        private int _codigoRol;

        public int cod_rol
        {
            get { return _codigoRol; }
            set { _codigoRol = value; }
        }

        private string _usuario;
        public string usuario_nom
        {
            get { return _usuario; }
            set { _usuario = value; }
        }


        private string _usuario_modificador;
        public string usuario_modificador
        {
            get { return _usuario_modificador; }
            set { _usuario_modificador = value; }
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
        public string carga_lista_usuarios_rol(string cod_usuario)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                //insertar en la table de errores
                //  HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                return null;
            }
            else
            {
                sql = "ver_usuario_rol";
                ParamStruct[] parametros = new ParamStruct[1];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@usuario", SqlDbType.VarChar, cod_usuario);
                ds = cls_DAL.ejecuta_dataset(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {
                    //insertar en la table de errores
                    //HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                    return null;
                }
                else
                {
                    return JsonConvert.SerializeObject(ds.Tables[0]);
                }
            }
        }

        public bool agregar_usuario_rol(string accion)
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
                    sql = "crear_usuario_rol";
                }
                ParamStruct[] parametros = new ParamStruct[3];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@usuarioActualizado", SqlDbType.VarChar, _usuario);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@rol", SqlDbType.Int, cod_rol);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@usuario", SqlDbType.VarChar, _usuario_modificador);
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


        public bool elimina_usuario_rol(int rol_cod, string nom_usu)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                //insertar en la table de errores
                //  HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                return false;
            }
            else
            {
                sql = "eliminar_usuario_rol";
                ParamStruct[] parametros = new ParamStruct[3];                
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@usuarioActualizado", SqlDbType.VarChar, nom_usu);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@rol ", SqlDbType.Int, rol_cod);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@usuario", SqlDbType.VarChar, _usuario_modificador);
                cls_DAL.conectar(conexion, ref mensaje_error, ref numero_error);
                cls_DAL.ejecuta_sqlcommand(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {
                    //insertar en la table de errores
                    // HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
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