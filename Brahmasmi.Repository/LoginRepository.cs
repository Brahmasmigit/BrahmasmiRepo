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
        public Login Login(string mobileNumber)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("mobilenumber", mobileNumber, DbType.String);
            var result = dapper.Get<Login>("[dbo].[sp_getusers]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
          
        }
    }
}
