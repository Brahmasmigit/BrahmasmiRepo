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
            string password = RandomString(10);
            dbParam.Add("StoreName", store.StoreName, DbType.String);
            dbParam.Add("CityID", store.CityID, DbType.Int32);
            dbParam.Add("OwnerName", store.OwnerName, DbType.String);
            dbParam.Add("MobileNumber", store.MobileNumber, DbType.String);
            dbParam.Add("EmailID", store.EmailID, DbType.String);
            dbParam.Add("Address", store.Address, DbType.String);
            dbParam.Add("PinCode", store.PinCode, DbType.String);
            dbParam.Add("Store_Password", password, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_Store]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public string RandomString(int size, bool lowerCase = false)
        {
            Random _random = new Random();
            var builder = new StringBuilder(size);

            // Unicode/ASCII Letters are divided into two blocks
            // (Letters 65–90 / 97–122):
            // The first group containing the uppercase letters and
            // the second group containing the lowercase.  

            // char is a single Unicode character  
            char offset = lowerCase ? 'a' : 'A';
            const int lettersOffset = 26; // A...Z or a..z: length=26  

            for (var i = 0; i < size; i++)
            {
                var @char = (char)_random.Next(offset, offset + lettersOffset);
                builder.Append(@char);
            }

            return lowerCase ? builder.ToString().ToLower() : builder.ToString();
        }
    }
}
