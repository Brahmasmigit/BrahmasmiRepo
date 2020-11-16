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
    public class AdminProductRepository : IAdminProductRepository
    {
        private readonly IDapper dapper;
        public AdminProductRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<StoreDashboard> GetBookingData(int statusid, string bookingdate)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("statusid", statusid, DbType.Int32);
            dbParam.Add("bookingdate", bookingdate, DbType.String);
            var result = dapper.GetAll<StoreDashboard>("[dbo].[SP_ADMINPRODUCTDASHOBARD]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}

