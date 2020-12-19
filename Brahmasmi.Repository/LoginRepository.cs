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
    public class LoginRepository : ILoginRepository
    {
        private readonly IDapper dapper;
        public LoginRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public User UserLogin(UserLogin user)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("User_MobileNumber", user.User_MobileNumber, DbType.String);
            dbParam.Add("User_Password", user.User_Password, DbType.String);
            var result = dapper.Get<User>("[dbo].[SP_Get_User]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public Vendor VendorLogin(UserLogin vendor)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("Vendor_MobileNumber", vendor.User_MobileNumber, DbType.String);
            dbParam.Add("Vendor_Password", vendor.User_Password, DbType.String);
            var result = dapper.Get<Vendor>("[dbo].[SP_Get_Vendor]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public Store StoreExist(UserLogin store)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("MobileNumber", store.User_MobileNumber, DbType.String);
            dbParam.Add("Store_Password", store.User_Password, DbType.String);
            var result = dapper.Get<Store>("[dbo].[SP_Get_Store]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
