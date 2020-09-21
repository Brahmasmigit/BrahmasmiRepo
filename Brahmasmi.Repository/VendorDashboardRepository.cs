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
    public class VendorDashboardRepository : IVendorDashboardRepository
    {
        private readonly IDapper dapper;
        public VendorDashboardRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<VendorDashboard> GetOngoing(int vendorid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("vendorid", vendorid, DbType.Int32);
            var result = dapper.GetAll<VendorDashboard>("[dbo].[SP_VENDORONGOING]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
