using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class UserRepository:IUserRepository
    {
        private readonly IDapper dapper;
        public UserRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }

     
        public User Login(UserLogin user)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("User_MobileNumber", user.User_MobileNumber, DbType.String);
            //dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Get<User>("[dbo].[SP_Insert_User]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
     
        public int UpdateUser(User user)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("UserId", user.UserID, DbType.Int32);
            dbParam.Add("User_MobileNumber",user. User_MobileNumber, DbType.String);
            dbParam.Add("CountryID", user.CountryID, DbType.Int32);
            dbParam.Add("StateID", user.StateID, DbType.Int32);
            dbParam.Add("CityID", user.CityID, DbType.Int32);
            //dbParam.Add("User_Name", user.User_Name, DbType.String);
            dbParam.Add("User_EmailID", user.User_EmailID, DbType.String);
            dbParam.Add("user_Address1", user.user_Address1, DbType.String);
            dbParam.Add("User_PinCode", user.User_PinCode, DbType.String);
            //dbParam.Add("User_Status", user.User_Status, DbType.String);
            //dbParam.Add("User_Latitude", user.User_Latitude, DbType.String);
            //dbParam.Add("User_Longitude", user.User_Longitude, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Update_UserProfile]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
           
            return result ;
        }

    }
}
