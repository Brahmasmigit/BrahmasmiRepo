using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using System.Reflection;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class PoojaSubscriptionFormRepository : IPoojaSubscriptionFormRepository
    {
        private readonly IDapper dapper;
        public PoojaSubscriptionFormRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<SubscriptionCategory> GetSubscriptionForm()
        {
            var dbParam = new DynamicParameters();

            var result = dapper.GetAll<SubscriptionCategory>("[dbo].[SP_Get_SubscriptionCategory]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public List<PoojaServices> GetPoojaServices()
        {
            var dbParam = new DynamicParameters();

            var result = dapper.GetAll<PoojaServices>("[dbo].[SP_Get_PoojaServices]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public int AddPoojaSubscriptionForm(PoojaSubscriptionForm PoojaSubscription)
        {
            var dbParam = new DynamicParameters();

            dbParam.Add("SubscriptionCategoryID ", PoojaSubscription.SubscriptionCategoryID, DbType.Int32);
            //dbParam.Add("PoojaServicesID ", PoojaSubscription.PoojaServicesID, DbType.Int32);
            dbParam.Add("Name", PoojaSubscription.Name, DbType.String);
            dbParam.Add("Address", PoojaSubscription.Address, DbType.String);
            dbParam.Add("MobileNumber", PoojaSubscription.MobileNumber, DbType.String);
            dbParam.Add("EmailID", PoojaSubscription.EmailID, DbType.String);
            dbParam.Add("Latitude", PoojaSubscription.Latitude, DbType.String);
            dbParam.Add("Longitude", PoojaSubscription.Longitude, DbType.String);
            DataTable dtPoojaservices = new DataTable();
            dtPoojaservices = GetPoojaServices(PoojaSubscription.PoojaService);
            dbParam.Add("PoojaSubscriptionServices", dtPoojaservices.AsTableValuedParameter("dbo.TT_PoojaSubscriptionServices"));
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_PoojaSubscriptionForm]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public DataTable GetPoojaServices(List<PoojaSubscriptionServices> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("PoojaSubscriptionFormID", typeof(int));
            table.Columns.Add("PoojaServicesID", typeof(int));


            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    if (lstdetails[i].IsChecked == true)
                    {
                        row["PoojaSubscriptionFormID"] = lstdetails[i].PoojaSubscriptionFormID;
                        row["PoojaServicesID"] = lstdetails[i].PoojaServicesID;

                        table.Rows.Add(row);
                    }

                }
            }
            return table;

        }

    }
}
