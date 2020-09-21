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
    public class RegisterRepository : IRegisterRepository
    {
        private readonly IDapper dapper;
        public RegisterRepository(IDapper _dapper)
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
        public int RegisterUser(Register register)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("name", register.Name, DbType.String);
            dbParam.Add("email", register.Email, DbType.String);
            dbParam.Add("result", null, DbType.Int32,ParameterDirection.ReturnValue);
            int result = dapper.Execute("[dbo].[sp_RegisterUser]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
