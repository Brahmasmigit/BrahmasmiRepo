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
    public class AdminLoginRepository:IAdminLoginRepository
    {
        private readonly IDapper dapper;
        public AdminLoginRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public AdminLogin CheckAdminExist(AdminLogin adminLogin)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("UserName", adminLogin.UserName, DbType.String);
            dbParam.Add("Password", adminLogin.Password, DbType.String);
            var result = dapper.Get<AdminLogin>("[dbo].[SP_AdminLogin]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
