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
    public class SpecialserviceRepository : ISpecialserviceRepository
    {
        private readonly IDapper dapper;
        public SpecialserviceRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<SpecialServices> GetSpecialservices()
        {
            var dbParam = new DynamicParameters();
            
            var result = dapper.GetAll<SpecialServices>("[dbo].[SP_Get_Specialservices]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public List<SpecialServicesEnquiry> GetAllSpecialServicesEnquiry()
        {
            var dbParam = new DynamicParameters();

            var result = dapper.GetAll<SpecialServicesEnquiry>("[dbo].[SP_Get_AllSpecialServicesEnquiry]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public int AddSpecialservice(SpecialServicesEnquiry specialservice)
        {
            var dbParam = new DynamicParameters();
   
            dbParam.Add("SpecialServiceID", specialservice.SpecialServiceID, DbType.Int32);
            dbParam.Add("Name", specialservice.Name, DbType.String);
            dbParam.Add("MobileNumber", specialservice.MobileNumber, DbType.String);
            dbParam.Add("EmailID", specialservice.EmailID, DbType.String);
            dbParam.Add("Address", specialservice.Address, DbType.String);
            dbParam.Add("Latitude", specialservice.Latitude, DbType.String);
            dbParam.Add("Longitude", specialservice.Longitude, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_SpecialServiceEnquiry]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }

    }
}
