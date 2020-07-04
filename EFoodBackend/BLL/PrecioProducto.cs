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
   public class PrecioProducto
    {
        #region propiedades

        private string _codigoProd;
        public string codigoProd
        {
            get { return _codigoProd; }
            set { _codigoProd = value; }
        }

        private string _codigoTP;
        public string codigoTP
        {
            get { return _codigoTP; }
            set { _codigoTP = value; }
        }

        private decimal _precio;
        public decimal precio
        {
            get { return _precio; }
            set { _precio = value; }
        }

        private string _usuario;
        public string usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
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
        public string cargar_PrecioProducto(string cod_prod)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
              
                return null;
            }
            else
            {
                sql = "ver_tipoPrecio_Producto";
                ParamStruct[] parametros = new ParamStruct[1];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigoProducto", SqlDbType.VarChar, cod_prod);
                ds = cls_DAL.ejecuta_dataset(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
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

        public bool agregarPrecioProducto(string accion)
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
                    sql = "crear_tipoPrecio_producto";
                }
                ParamStruct[] parametros = new ParamStruct[4];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigoProd", SqlDbType.VarChar, _codigoProd);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@codigoTP", SqlDbType.VarChar, _codigoTP);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@precio", SqlDbType.Decimal, _precio);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@usuario", SqlDbType.VarChar, _usuario);
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

        public bool modificarPrecioProducto(string accion)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)            {
               
                return false;
            }
            else
            {
                if (accion.Equals("Actualizar"))
                {
                    sql = "modificar_tipoPrecio_producto";
                }
                ParamStruct[] parametros = new ParamStruct[4];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0,"@codigoProd", SqlDbType.VarChar, _codigoProd);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@codigoTP", SqlDbType.VarChar, _codigoTP);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@precio", SqlDbType.Decimal, _precio);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@usuario", SqlDbType.VarChar, _usuario);
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
        public bool eliminarPrecioProducto(string cod)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                //insertar en la table de errores
                //HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
                return false;
            }
            else
            {
                sql = "eliminar_tipoPrecio_producto";
                ParamStruct[] parametros = new ParamStruct[3];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigoProd ", SqlDbType.VarChar, _codigoProd);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@codigoTP", SqlDbType.VarChar, _codigoTP);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@usuario", SqlDbType.VarChar, _usuario);
                cls_DAL.conectar(conexion, ref mensaje_error, ref numero_error);
                cls_DAL.ejecuta_sqlcommand(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {
                    //insertar en la table de errores
                    //  HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
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
