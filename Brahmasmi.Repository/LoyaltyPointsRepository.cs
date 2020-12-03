using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class LoyaltyPointsRepository:ILoyaltyPointsRepository
    {
        private readonly IDapper dapper;
        public LoyaltyPointsRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<LoyaltyPointsModel> GetLoyaltyPoints()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<LoyaltyPointsModel>("[dbo].[SP_Get_AllLoyaltyPoints]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int AddUpdateLoyaltyPoints(LoyaltyPointsModel loyalty)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("LoyaltyPoints", loyalty.LoyaltyPoints, DbType.Int32);
            dbParam.Add("LoyaltyType", loyalty.LoyaltyType, DbType.String);
            dbParam.Add("Action", loyalty.Action, DbType.String);
            if (loyalty.Action == "Update")
            {
                dbParam.Add("LoyaltyID", loyalty.LoyaltyID, DbType.Int32);
            }
            else
            {
                dbParam.Add("LoyaltyID", 0, DbType.Int32);
            }
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_InsertUpdate_LoyltyPoints]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int DeleteLoyaltyPoints(LoyaltyPointsModel loyalty)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("LoyaltyID", loyalty.LoyaltyID, DbType.Int32);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Delete_LoyalityPoints]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }

    }
}