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
        public List<UserDashboard> GetOngoing(int userid,string calendarType)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("userid", userid, DbType.Int32);
            dbParam.Add("calendartype", calendarType, DbType.String);
            var result = dapper.GetAll<UserDashboard>("[dbo].[SP_USERONGOING]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int UserRatings(Ratings ratings)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("@BOOKINGID", ratings.BookingId, DbType.Int32);
            dbParam.Add("@RATINGS", ratings.RatingStars, DbType.Int32);
            dbParam.Add("@REVIEWCOMMENTS", ratings.ReviewComments, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_UPDATEUSERRATING]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<StoreDashboard> GetUserProductDetails(int userid, string usertype, string calendarType)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("userid", userid, DbType.Int32);
            dbParam.Add("usertype", usertype, DbType.String);
            dbParam.Add("calendartype", calendarType, DbType.String);
            var result = dapper.GetAll<StoreDashboard>("[dbo].[SP_USERPRODUCTORDERDETAILS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
