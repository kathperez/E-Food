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
    public class Error_Intra
    {
        #region propiedades

        private string _fecha1;
        public string fecha1
        {
            get { return _fecha1; }
            set { _fecha1 = value; }
        }

        private string _fecha2;
        public string fecha2
        {
            get { return _fecha2; }
            set { _fecha2 = value; }
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
        //Estos métodos conectan la parte de la base de datos con lo que viene del API.

        /// <summary>
        /// Metodo para ver los errores de la intranet
        /// </summary>
        /// <param name="fecha1"></param>
        /// <param name="fecha2"></param>
        /// <returns></returns>
        /// 

        public string test()
        {
            return "test";
        }
        public string carga_lista_erroresRango(string fecha1, string fecha2)
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
                sql = "ver_errorIntraFecha";
                ParamStruct[] parametros = new ParamStruct[2];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@fecha1", SqlDbType.VarChar, fecha1);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@fecha2", SqlDbType.VarChar, fecha2);
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

        #endregion

    }
}
