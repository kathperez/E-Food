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
    public class ProcesadorTarjeta
    {
        #region propiedades

        private string _codigoProce;
        public string codigoProce
        {
            get { return _codigoProce; }
            set { _codigoProce = value; }
        }

        private string _codigoTarje;
        public string codigoTarje
        {
            get { return _codigoTarje; }
            set { _codigoTarje = value; }
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
        public string cargarProcesadorTarjeta(string codigoProcesador)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                return null;
            }
            else
            {
                sql = "ver_procesaTarj";
                ParamStruct[] parametros = new ParamStruct[1];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigoProcesador", SqlDbType.VarChar, codigoProcesador);
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
        public bool agregarProcesadorTarjeta(string accion)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                 return false;
            }
            else
            {
                if (accion.Equals("Insertar"))
                {
                    sql = "crear_procesaTarje";
                }
                ParamStruct[] parametros = new ParamStruct[3];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigoProce", SqlDbType.VarChar, _codigoProce);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@codigoTarje", SqlDbType.VarChar, _codigoTarje);
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
        public bool eliminarProcesadorTarjeta(string tipoTarjeta, string tipoProcesador)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                return false;
            }
            else
            {
                sql = "eliminar_procesaTarje";
                ParamStruct[] parametros = new ParamStruct[3];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@codigoProcesa ", SqlDbType.VarChar, tipoProcesador);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@codigoTarj", SqlDbType.VarChar, tipoTarjeta);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@usuario  ", SqlDbType.VarChar, _usuario);
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
