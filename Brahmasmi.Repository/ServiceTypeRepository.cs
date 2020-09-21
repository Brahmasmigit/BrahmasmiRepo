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
    public class ServiceTypeRepository : IServiceTypeRepository
    {
        private readonly IDapper dapper;
        public ServiceTypeRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<ServiceType> GetServiceTypes(int cityid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("cityid", cityid, DbType.Int32);
            var result = dapper.GetAll<ServiceType>("[dbo].[SP_GETSERVICETYPES]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
