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
    public class Bitacora
    {

      
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
        /// Metodo para ver bitacora por rango fecha y usuario
        /// </summary>
        /// <param name="fecha1"></param>
        /// <param name="fecha2"></param>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public string carga_lista_Bitacora(string fecha1, string fecha2, string usuario)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {
              
                return null;
            }
            else
            {
                sql = "ver_bitacoraUsuFech";
                ParamStruct[] parametros = new ParamStruct[3];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@usuario", SqlDbType.VarChar, usuario);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 1, "@fecha1", SqlDbType.VarChar, fecha1);
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 2, "@fecha2", SqlDbType.VarChar, fecha2);
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

        #endregion

    }
}
