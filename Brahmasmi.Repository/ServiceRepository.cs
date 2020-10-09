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
    public class ServiceRepository : IServiceRepository
    {
        private readonly IDapper dapper;
        public ServiceRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<Services> GetServices(int servicetypeid, int cityid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("servicetypeid", servicetypeid, DbType.Int32);
            dbParam.Add("cityid", cityid, DbType.Int32);
            var result = dapper.GetAll<Services>("[dbo].[SP_GETSERVICES]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<Services> SearchServices(string search)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("search", search, DbType.String);
            var result = dapper.GetAll<Services>("[dbo].[SP_SEARCHSERVICE]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
           // dapper.ExecuteTableType();
            return result;

        }
        //public List<Services> test(string search)
        //{
        //    var dbParam = new DynamicParameters();
        //    //dbParam.Add("search", lst,D);
        //    dbParam.Add("@PersonList", PersonList.AsTableValuedParameter("[dbo].[udtt_PersonList]"));
        //    var result = dapper.GetAll<Services>("[dbo].[SP_SEARCHSERVICE]"
        //         , dbParam,
        //         commandType: CommandType.StoredProcedure);
        //    return result;

        //}
        //List<Services> lst = new List<Services>();
        //DataTable dt = new DataTable();
     

     
    }
}
