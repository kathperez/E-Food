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
   public class ConsultaProducto
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
       /// Metodo para cargar productos según su linea de comida
       /// </summary>
       /// <param name="lineaComida"></param>
       /// <returns></returns>

        public string carga_lista_ProductoLC(string lineaComida)
        {
            conexion = cls_DAL.trae_conexion("Progra5", ref mensaje_error, ref numero_error);
            if (conexion == null)
            {

                return null;
            }
            else
            {
                sql = "ver_ProductoPorLinea";
                ParamStruct[] parametros = new ParamStruct[1];
                cls_DAL.agregar_datos_estructura_parametros(ref parametros, 0, "@lineaComida", SqlDbType.VarChar, lineaComida);
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
