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
    public class ServiceDetailsRepository : IServiceDetailsRepository
    {
        private readonly IDapper dapper;
        public ServiceDetailsRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public ServiceDetails GetServiceDetails(int serviceid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("serviceid", serviceid, DbType.Int32);
            List<ServiceDetails> result = dapper.GetAll<ServiceDetails>("[dbo].[SP_GETSERVICEDETAILS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);

            ServiceDetails serviceRecord=null;
            if (result.Count() > 0)
            {
                result[0].ListInsight = new List<string>();
                foreach (var item in result.Select(x => x).ToList())
                {
                    result[0].ListInsight.Add(item.Insight);
                }
             serviceRecord = result.Select(x => x).FirstOrDefault();
            }           
            return serviceRecord;

        }
    }
}
