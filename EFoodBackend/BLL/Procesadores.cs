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
  public class Procesadores
    {
        #region propiedades

        private string _codigo;
        public string codigo
        {
            get { return _codigo; }
            set { _codigo = value; }
        }

        private string _procesador;
        public string procesador
        {
            get { return _procesador; }
            set { _procesador = value; }
        }
        private string _nombre;

        public string nombre
        {
            get { return _nombre; }
            set { _nombre = value; }
        }

        private string _tipo;
        public string tipo
        {
            get { return _tipo; }
            set { _tipo = value; }
        }

        private string _estado;
        public string estado
        {
            get { return _estado; }
            set { _estado = value; }
        }

        private string _validacion;
        public string validacion
        {
            get { return _validacion; }
            set { _validacion = value; }
        }

        private string _metodo;
        public string metodo
        {
            get { return _metodo; }
            set { _metodo = value; }
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
        public string carga_Procesadores()
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                return null;
            }
            else
            {
                sql = "ver_procesadorPago";
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

        public bool agregarProcesador(string accion)
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
                    sql = "crear_procesador";
                }
                ParamStruct[] parametros = new ParamStruct[7];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@procesador", SqlDbType.VarChar, _procesador);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@nombre", SqlDbType.VarChar, _nombre);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@tipo", SqlDbType.VarChar, _tipo);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@estado", SqlDbType.VarChar, _estado);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 4, "@validacion", SqlDbType.VarChar, _validacion);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 5, "@metodo", SqlDbType.VarChar, _metodo);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 6, "@usuario", SqlDbType.VarChar, _usuario);
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

        public bool eliminarProcesadorPago(string cod_)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                
                return false;
            }
            else
            {
                sql = "eliminar_procesadorPago";
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
        public bool modificarProcesador(string accion)
        {
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
                    if (accion.Equals("Actualizar"))
                    {
                        sql = "modificar_procesadorP";
                    }
                    ParamStruct[] parametros = new ParamStruct[8];
                    cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigo", SqlDbType.VarChar, _codigo);
                    cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@procesador", SqlDbType.VarChar, _procesador);
                    cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@nombre", SqlDbType.VarChar, _nombre);
                    cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@tipo", SqlDbType.VarChar, _tipo);
                    cls_DAL.agregar_datos_estructura_parametros(ref parametros, 4, "@estado", SqlDbType.VarChar, _estado);
                    cls_DAL.agregar_datos_estructura_parametros(ref parametros, 5, "@validacion", SqlDbType.VarChar, _validacion);
                    cls_DAL.agregar_datos_estructura_parametros(ref parametros, 6, "@metodo", SqlDbType.VarChar, _metodo);
                    cls_DAL.agregar_datos_estructura_parametros(ref parametros, 7, "@usuario", SqlDbType.VarChar, _usuario);
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
        }

        #endregion
    }
}
