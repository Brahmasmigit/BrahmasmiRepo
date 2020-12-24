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
    public class ConcernEnquiryRepository:IConcernEnquiryRepository
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
        public int AddConcernDetails(ConcernEnquiry concern)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("ConcernID", concern.ConcernID, DbType.Int32);
            dbParam.Add("RequestedAmount", concern.RequestedAmount, DbType.Decimal);
            dbParam.Add("Name", concern.Name, DbType.String);
            dbParam.Add("MobileNumber", concern.MobileNumber, DbType.String);
            dbParam.Add("EmailID", concern.EmailID, DbType.String);
            dbParam.Add("Address", concern.Address, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_ConcernDetails]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
