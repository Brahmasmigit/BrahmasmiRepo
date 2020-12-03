using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class CouponRepository:ICouponRepository
    {
        private readonly IDapper dapper;
        public CouponRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<Coupon> GetCouponDetails()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<Coupon>("[dbo].[SP_Get_AllCoupons]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int AddUpdateCoupon(Coupon coupon)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("CouponCode", coupon.CouponCode, DbType.String);
            dbParam.Add("CouponDescription", coupon.CouponDescription, DbType.String);
            dbParam.Add("CouponDiscount", coupon.CouponDiscount, DbType.Int32);
            dbParam.Add("CouponExpiryDate", coupon.CouponExpiryDate, DbType.DateTime);
            dbParam.Add("Action", coupon.Action, DbType.String);
            if (coupon.Action == "Update")
            {
                dbParam.Add("CouponID", coupon.CouponID, DbType.Int32);
            }
            else
            {
                dbParam.Add("CouponID", 0, DbType.Int32);
            }
                dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_InsertUpdate_Coupon]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int DeleteCoupon(Coupon coupon)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("CouponID", coupon.CouponID, DbType.Int32);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Delete_Coupon]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }

    }
}
