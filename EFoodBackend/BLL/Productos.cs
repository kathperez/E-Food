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
   public class Productos
    {
        #region propiedades
        private string _cod_prod;
        public string cod_prod
        {
            get { return _cod_prod; }
            set { _cod_prod = value; }
        }

        private string _descripcion;
        public string descripcion
        {
            get { return _descripcion; }
            set { _descripcion = value; }
        }

        private string _contenido;
        public string contenido
        {
            get { return _contenido; }
            set { _contenido = value; }
        }

        private string _linea_comida;
        public string linea_comida
        {
            get { return _linea_comida; }
            set { _linea_comida = value; }
        }

        private string _usuario;
        public string usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
        }

        private string _foto;
        public string foto
        {
            get { return _foto; }
            set { _foto = value; }
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
        public string carga_lista_Productos()
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                return null;
            }
            else
            {
                sql = "ver_producto";
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

        public bool agregarProducto(string accion)
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
                    sql = "crear_producto";
                }
                ParamStruct[] parametros = new ParamStruct[5];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@lineaComida", SqlDbType.VarChar, _linea_comida);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@descripcion", SqlDbType.VarChar, _descripcion);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@contenido", SqlDbType.VarChar, _contenido);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@foto", SqlDbType.VarChar, _foto);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 4, "@usuario", SqlDbType.VarChar, _usuario);
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

        public bool eliminarProducto(string cod)
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
                sql = "eliminar_producto";
                ParamStruct[] parametros = new ParamStruct[2];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigo", SqlDbType.VarChar, _cod_prod);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@usuario", SqlDbType.VarChar, _usuario);
                cls_DAL.conectar(conexion, ref mensaje_error, ref numero_error);
                cls_DAL.ejecuta_sqlcommand(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
                if (numero_error != 0)
                {
                    //insertar en la table de errores
                    //   HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
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
        public bool modificarProducto(string accion)
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
                    sql = "modificar_producto";
                }
                ParamStruct[] parametros = new ParamStruct[6];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigo", SqlDbType.VarChar, _cod_prod);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@lineaComida", SqlDbType.VarChar, _linea_comida);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@descripcion", SqlDbType.VarChar, _descripcion);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@contenido", SqlDbType.VarChar, _contenido);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 4, "@foto", SqlDbType.VarChar, _foto);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 5, "@usuario", SqlDbType.VarChar, _usuario); 
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