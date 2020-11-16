using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class StoreDashboardRepository:IStoreDashboardRepository
    {
        private readonly IDapper dapper;
        public StoreDashboardRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<StoreDashboard> GetStoreOrderDetails(int storeid,string storetype, string calendarType)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("storeid", storeid, DbType.Int32);
            dbParam.Add("storetype", storetype, DbType.String);
            dbParam.Add("calendartype", calendarType, DbType.String);
            var result = dapper.GetAll<StoreDashboard>("[dbo].[SP_STOREORDERDETAILS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int BookingChangeStatus(BookingChangeStatus booking)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("BookingId", booking.BookingId, DbType.Int32);
            dbParam.Add("BookingStatusId", booking.BookingStatusId, DbType.Int32);

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            int result = dapper.Execute("[dbo].[SP_PRODUCTCHANGEBOOKINGSTATUS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
