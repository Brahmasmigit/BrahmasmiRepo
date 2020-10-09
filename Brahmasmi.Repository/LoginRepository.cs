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
        public User UserLogin(string mobilenumber)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("User_MobileNumber", mobilenumber, DbType.String);
            var result = dapper.Get<User>("[dbo].[SP_Get_User]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public Vendor VendorLogin(string mobilenumber)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("Vendor_MobileNumber", mobilenumber, DbType.String);
            var result = dapper.Get<Vendor>("[dbo].[SP_Get_Vendor]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
