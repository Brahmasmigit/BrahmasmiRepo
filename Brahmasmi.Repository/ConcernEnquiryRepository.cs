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
    public class ConcernEnquiryRepository : IConcernEnquiryRepository
    {
        private readonly IDapper dapper;
        public ConcernEnquiryRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<ConcernTypes> GetConcernTypes()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<ConcernTypes>("[dbo].[SP_Get_ConcernTypes]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;

        }
        //(Admin)
        public List<ConcernEnquiry> GetAllConcernDetails()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<ConcernEnquiry>("[dbo].[SP_Get_AllConcernDetails]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;

        }
        public int AddConcernDetails(ConcernEnquiry concernEnquiry)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("ConcernID", concernEnquiry.ConcernID, DbType.Int32);
            //dbParam.Add("ConcernType", concernEnquiry.ConcernType, DbType.String);
            dbParam.Add("RequestedAmount", concernEnquiry.RequestedAmount, DbType.Decimal);
            dbParam.Add("Name", concernEnquiry.Name, DbType.String);
            dbParam.Add("MobileNumber", concernEnquiry.MobileNumber, DbType.String);
            dbParam.Add("EmailID", concernEnquiry.EmailID, DbType.String);
            dbParam.Add("Address", concernEnquiry.Address, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_ConcernEnquiry]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
