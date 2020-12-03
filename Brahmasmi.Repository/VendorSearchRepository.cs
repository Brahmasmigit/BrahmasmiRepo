using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class VendorSearchRepository : IVendorSearchRepository
    {
        private readonly IDapper dapper;
        public VendorSearchRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<VendorSearch> SearchVendors(int cityid, string region)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("cityid", cityid, DbType.Int32);
            dbParam.Add("region", region, DbType.String);
            var result = dapper.GetAll<VendorSearch>("[dbo].[sp_searchvendors]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }   

    }
}


