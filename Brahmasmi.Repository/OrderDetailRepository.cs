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
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly IDapper dapper;
        public OrderDetailRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<OrderDetail> GetOrderDetails(string invoiceno)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("userid", null, DbType.Int32);
            dbParam.Add("bookingid", null, DbType.Int32);
            dbParam.Add("orderno", null, DbType.String);
            dbParam.Add("invoiceno", invoiceno, DbType.String);
            var result = dapper.GetAll<OrderDetail>("[dbo].[SP_GETORDERDETAILS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
