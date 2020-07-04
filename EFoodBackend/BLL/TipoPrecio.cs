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
  public class TipoPrecio
    {

        #region propiedades

        private string _descripcion;
        public string descripcion
        {
            get { return _descripcion; }
            set { _descripcion = value; }
        }

        private string _codigo;

        public string codigo
        {
            get { return _codigo; }
            set { _codigo = value; }
        }

        private string _usuario;
        public string usuario
        {
            get { return _usuario; }
            set { _usuario= value; }
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
        public string cargaPrecios()
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                //insertar en la table de errores
                //HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                return null;
            }
            else
            {
                sql = "ver_tipoPrecio";
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
        public bool agregarTipoPrecio(string accion)
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
                    sql = "crear_tipoPrecio";
                }
                ParamStruct[] parametros = new ParamStruct[2];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@descripcion", SqlDbType.VarChar, _descripcion);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@usuario", SqlDbType.VarChar, _usuario);
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

        public bool eliminarPrecio(string cod)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
               
                return false;
            }
            else
            {
                sql = "eliminar_tipoPrecio";
                ParamStruct[] parametros = new ParamStruct[2];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigo", SqlDbType.VarChar, _codigo);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@usuario", SqlDbType.VarChar, _usuario);
                cls_DAL.conectar(conexion, ref mensaje_error, ref numero_error);
                cls_DAL.ejecuta_sqlcommand(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {
                   
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

        public bool modificar_precio(string accion)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {                
                return false;
            }
            else
            {
                if (accion.Equals("Actualizar"))
                {
                    sql = "modificar_tipoPrecio";
                }
                ParamStruct[] parametros = new ParamStruct[3];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigo", SqlDbType.VarChar, _codigo);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@descripcion", SqlDbType.VarChar, _descripcion);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@usuario", SqlDbType.VarChar, _usuario);
                cls_DAL.conectar(conexion, ref mensaje_error, ref numero_error);
                cls_DAL.ejecuta_sqlcommand(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {
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
