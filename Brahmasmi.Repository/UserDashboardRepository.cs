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
    public class UserDashboardRepository : IUserDashboardRepository
    {
        private readonly IDapper dapper;
        public UserDashboardRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<UserDashboard> GetOngoing(int userid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("userid", userid, DbType.Int32);
            var result = dapper.GetAll<UserDashboard>("[dbo].[SP_USERONGOING]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
