using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using System.Reflection;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class StoreRepository:IStoreRepository
    {
        private readonly IDapper dapper;
        public StoreRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int StoreRegistration(Store store)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("StoreName", store.StoreName, DbType.String);
            dbParam.Add("CityID", store.CityID, DbType.Int32);
            dbParam.Add("OwnerName", store.OwnerName, DbType.String);
            dbParam.Add("MobileNumber", store.MobileNumber, DbType.String);
            dbParam.Add("EmailID", store.EmailID, DbType.String);
            dbParam.Add("Address", store.Address, DbType.String);
            dbParam.Add("PinCode", store.PinCode, DbType.String);
         
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_Store]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
     }
}
