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
    public class CommunityServicesRepository : ICommunityServicesRepository
    { 
        private readonly IDapper dapper;
        public CommunityServicesRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int RegisterCommunityServices(CommunityServices slot)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("StateID", slot.StateID, DbType.Int32);
            dbParam.Add("CityID", slot.CityID, DbType.Int32);
            dbParam.Add("CommunityCategoryID", slot.CommunityCategoryID, DbType.Int32);
            dbParam.Add("Name", slot.Name, DbType.String);
            dbParam.Add("MobileNumber", slot.MobileNumber, DbType.String);
            dbParam.Add("EmailID", slot.EmailID, DbType.String);
            dbParam.Add("Address", slot.Address, DbType.String);
            dbParam.Add("Pincode", slot.Pincode, DbType.String);
            dbParam.Add("Latitude", slot.Latitude, DbType.String);
            dbParam.Add("Longitude", slot.Longitude, DbType.String);
            //dbParam.Add("CreatedDate", slot.CreatedDate, DbType.datetime);
            //dbParam.Add("IsDelete", slot.IsDelete, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_CommunityServices]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }

        public List<CommunityCategories> GetCommunityCategories()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<CommunityCategories>("[dbo].[SP_Get_CommunityCategories]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<CommunityServices> GetAllCommunityCategories()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<CommunityServices>("[dbo].[SP_Get_AllCommunityCategories]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}

