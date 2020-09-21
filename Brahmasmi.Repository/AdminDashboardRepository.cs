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
    public class AdminDashboardRepository : IAdminDashboardRepository
    {
        private readonly IDapper dapper;
        public AdminDashboardRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<AdminDashboard> GetBookingData(int statusid, string bookingdate)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("statusid", statusid, DbType.Int32);
            dbParam.Add("bookingdate", bookingdate, DbType.String);
            var result = dapper.GetAll<AdminDashboard>("[dbo].[SP_ADMINDASHBOARD]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}

