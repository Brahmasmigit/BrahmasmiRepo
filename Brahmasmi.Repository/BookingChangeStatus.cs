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
    public class BookingChangeStatusRepository : IBookingChangeStatusRepository
    {
        private readonly IDapper dapper;
        public BookingChangeStatusRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int BookingChangeStatus(BookingChangeStatus booking)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("BookingId", booking.BookingId, DbType.Int32);
            dbParam.Add("BookingStatusId", booking.BookingStatusId, DbType.Int32);

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            int result = dapper.Execute("[dbo].[SP_CHANGEBOOKINGSTATUS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
