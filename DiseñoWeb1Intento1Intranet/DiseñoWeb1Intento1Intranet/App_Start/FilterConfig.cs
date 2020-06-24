using System.Web;
using System.Web.Mvc;

namespace DiseñoWeb1Intento1Intranet
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
