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
    public class Consecutivo
    {
        #region propiedades

        private int _consecutivo;
        public int consecutivo
        {
            get { return _consecutivo; }
            set { _consecutivo = value; }
        }

        private string _descripcion;
        public string descripcion
        {
            get { return _descripcion; }
            set { _descripcion = value; }
        }

        private string _posee_pre;

        public string posee_pre
        {
            get { return _posee_pre; }
            set { _posee_pre = value; }
        }

        private string _prefijo;
        public string prefijo
        {
            get { return _prefijo; }
            set { _prefijo = value; }
        }

        private string _usuario;
        public string usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
        }
        private int _consec_viejo;

        public int consec_viejo
        {
            get { return _consec_viejo; }
            set { _consec_viejo = value; }
        }

        public string _descripcion_vie;
        public string descripcion_vie
        {
            get { return _descripcion_vie; }
            set { _descripcion_vie = value; }
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
        public string cargarConsecutivos()
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
                return null;
            }
            else
            {
                sql = "dbo.ver_consecutivo";
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
        //public string carga_lista_consecutivos2()
        //{
        //    conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
        //    if (conexion == null)
        //    {
        //        return null;
        //    }
        //    else
        //    {
        //        sql = "stp_consecutivo_ver_SinCon ";
        //        ds = cls_DAL.ejecuta_dataset(conexion, sql, true, ref mensaje_error, ref numero_error);
        //        if (numero_error != 0)
        //        {
        //            return null;
        //        }
        //        else
        //        {
        //            return JsonConvert.SerializeObject(ds.Tables[0]);
        //        }
        //    }

        //}
        //public string carga_lista_consecutivo_prefijo(int consecutivo)
        //{
        //    conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
        //    if (conexion == null)
        //    {
        //        //insertar en la table de errores
        //        //  HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
        //        return null;
        //    }
        //    else
        //    {
        //        sql = "stp_consecutivo_verPrefijo";
        //        ParamStruct[] parametros = new ParamStruct[1];
        //        cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@cod_consec", SqlDbType.VarChar, consecutivo);
        //        ds = cls_DAL.ejecuta_dataset(conexion, sql, true, parametros, ref mensaje_error, ref numero_error);
        //        if (numero_error != 0)
        //        {
        //            //insertar en la table de errores
        //            //HttpContext.Current.Response.Redirect("Error.aspx?error=" + numero_error.ToString() + "&men=" + mensaje_error);
        //            return null;
        //        }
        //        else
        //        {
        //            return JsonConvert.SerializeObject(ds.Tables[0]);
        //        }
        //    }
        //}

        public bool agregarConsecutivo(string accion)
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
                    sql = "dbo.crear_consecutivo";
                }
                ParamStruct[] parametros = new ParamStruct[5];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@consecutivo", SqlDbType.Int, _consecutivo);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@descripcion", SqlDbType.VarChar, _descripcion);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@posee_prefijo", SqlDbType.VarChar, _posee_pre);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@prefijo", SqlDbType.VarChar, _prefijo);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 4, "@usuario", SqlDbType.VarChar, _usuario);
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
        public bool actualizarConsecutivo(string accion)
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
                    sql = "dbo.modificar_consecutivo";
                }
                ParamStruct[] parametros = new ParamStruct[6];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@consecutivo_vie", SqlDbType.Int, _consec_viejo);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@descripcion_vie", SqlDbType.VarChar, _descripcion_vie);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@descripcion", SqlDbType.VarChar, _descripcion);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 3, "@posee_prefijo", SqlDbType.VarChar, _posee_pre);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 4, "@prefijo", SqlDbType.VarChar, _prefijo);
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
