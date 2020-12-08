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
        public List<VendorDashboard> GetOngoing(int vendorid, string calendarType)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("vendorid", vendorid, DbType.Int32);
            dbParam.Add("calendartype", calendarType, DbType.String);
            var result = dapper.GetAll<VendorDashboard>("[dbo].[SP_VENDORONGOING]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int VendorGeoUpdate(VendorGeo vendorGeo)
        {

            var dbParam = new DynamicParameters();
            dbParam.Add("@latitude", vendorGeo.Latitude, DbType.String);
            dbParam.Add("@longitude", vendorGeo.Longitude, DbType.String);
            dbParam.Add("@vendorid", vendorGeo.VendorId, DbType.Int32);

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[sp_VendorGeoUpdate]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);

            return result;

        }
    }
}
