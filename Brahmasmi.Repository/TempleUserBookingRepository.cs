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
    public class TempleUserBookingRepository : ITempleUserBookingRepository
    {
        private readonly IDapper dapper;
        public TempleUserBookingRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }        

        public List<TempleOrders> UserBooking(TempleUserBooking userBooking)
        {
            int result = 0;
            List<TempleOrders> listOrders = new List<TempleOrders>();
            string invoiceNo = RandomString(10);

            for (int i = 0; i < userBooking.ServiceDetails.Count; i++)
            {
                userBooking.OrderNO = RandomString(8);
                userBooking.InvoiceNo = invoiceNo;
                var dbParam = new DynamicParameters();

                dbParam.Add("@TransactionDetails", 1, DbType.Int32);
                dbParam.Add("@UserId", userBooking.UserId, DbType.Int32);
                dbParam.Add("@USERNAME", userBooking.UserName, DbType.String);
                dbParam.Add("@MOBILENUMBER", userBooking.MobileNumber, DbType.String);
                dbParam.Add("@EMAILID", userBooking.EmailId, DbType.String);
                dbParam.Add("@PINCODE", userBooking.PinCode, DbType.String);
                dbParam.Add("@BILLINGADDRESS", userBooking.BillingAddress, DbType.String);
                dbParam.Add("@TempleId", userBooking.TempleId, DbType.Int32);
                dbParam.Add("@UserQuery", userBooking.UserQuery, DbType.String);

                dbParam.Add("@ServiceId", userBooking.ServiceDetails[i].ServiceId, DbType.Int32);
                dbParam.Add("@ServiceName", userBooking.ServiceDetails[i].ServiceName, DbType.String);
                dbParam.Add("@ServicePrice", userBooking.ServiceDetails[i].ServicePrice, DbType.Int64);
                dbParam.Add("@BookingDate", userBooking.ServiceDetails[i].BookingDate, DbType.DateTime);
                dbParam.Add("@BookingTime", userBooking.ServiceDetails[i].BookingTime, DbType.Time);
                dbParam.Add("@BookingStatusId", userBooking.BookingStatusId, DbType.Int32);
                dbParam.Add("@BookingLocation", userBooking.BookingLocation, DbType.String);
                dbParam.Add("@TempleCityId", userBooking.TempleCityId, DbType.Int32);
                dbParam.Add("@TempleStateId", userBooking.TempleStateId, DbType.Int32);

                dbParam.Add("@BookingType", "Temple", DbType.String);
                dbParam.Add("@CityId", userBooking.CityId, DbType.Int32);

                dbParam.Add("@ORDERNO", userBooking.OrderNO, DbType.String);
                dbParam.Add("@PAYMENTMODE", userBooking.PaymentMode, DbType.Int32);
                dbParam.Add("@PAYMENTSTATUS", userBooking.PaymentStatus, DbType.Int32);
                dbParam.Add("@INVOICENO", userBooking.InvoiceNo, DbType.String);
                dbParam.Add("@TOTALAMOUNT", userBooking.Total, DbType.Int32);

                dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
                result = dapper.Execute("[dbo].[SP_TEMPLEUSERBOOKING]"
                    , dbParam,
                    commandType: CommandType.StoredProcedure);
                listOrders.Add(new TempleOrders() { OrderNO = userBooking.OrderNO, InvoiceNo = invoiceNo, Result = result });
            }

            for (int i = 0; i < userBooking.AccommodationDetails.Count; i++)
            {
                userBooking.InvoiceNo = invoiceNo;
                var dbParam = new DynamicParameters();

                dbParam.Add("@TransactionDetails", 2, DbType.Int32);
                dbParam.Add("@UserId", userBooking.UserId, DbType.Int32);
                dbParam.Add("@USERNAME", userBooking.UserName, DbType.String);
                dbParam.Add("@MOBILENUMBER", userBooking.MobileNumber, DbType.String);
                dbParam.Add("@EMAILID", userBooking.EmailId, DbType.String);
                dbParam.Add("@PINCODE", userBooking.PinCode, DbType.String);
                dbParam.Add("@BILLINGADDRESS", userBooking.BillingAddress, DbType.String);
                dbParam.Add("@TempleId", userBooking.TempleId, DbType.Int32);
                dbParam.Add("@UserQuery", userBooking.UserQuery, DbType.String);

                dbParam.Add("@RoomTypeId", userBooking.AccommodationDetails[i].RoomTypeId, DbType.Int32);
                dbParam.Add("@RoomType", userBooking.AccommodationDetails[i].RoomType, DbType.String);
                dbParam.Add("@RoomPrice", userBooking.AccommodationDetails[i].RoomPrice, DbType.Int64);
                //dbParam.Add("@RoomBookingDate", userBooking.AccommodationDetails[i].RoomBookingDate, DbType.DateTime);
                dbParam.Add("@CheckInDate", userBooking.AccommodationDetails[i].CheckInDate, DbType.DateTime);
                dbParam.Add("@CheckInTime", userBooking.AccommodationDetails[i].CheckInTime, DbType.Time);
                dbParam.Add("@CheckOutDate", userBooking.AccommodationDetails[i].CheckOutDate, DbType.DateTime);
                dbParam.Add("@CheckOutTime", userBooking.AccommodationDetails[i].CheckOutTime, DbType.Time);
                dbParam.Add("@NoOfDaysRequired", userBooking.AcmdNoOfDays, DbType.Int32);

                dbParam.Add("@CityId", userBooking.CityId, DbType.Int32);
                dbParam.Add("@PINCODE", userBooking.PinCode, DbType.String);
                dbParam.Add("@BILLINGADDRESS", userBooking.BillingAddress, DbType.String);

                dbParam.Add("@INVOICENO", userBooking.InvoiceNo, DbType.String);

                dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
                result = dapper.Execute("[dbo].[SP_TEMPLEUSERBOOKING]"
                    , dbParam,
                    commandType: CommandType.StoredProcedure);
            }



            return listOrders;
        }

        //public DataTable GetServiceBookingDetails(List<UserServiceDetails> lstdetails)
        //{

        //    var table = new DataTable();
        //    table.Columns.Add("ServiceId", typeof(int));
        //    table.Columns.Add("ServiceName", typeof(string));
        //    table.Columns.Add("ServicePrice", typeof(double));
        //    table.Columns.Add("BookingDate", typeof(DateTime));
        //    table.Columns.Add("BookingTime", typeof(string));
        //    if (lstdetails.Count > 0)
        //    {
        //        for (int i = 0; i < lstdetails.Count; i++)
        //        {
        //            var row = table.NewRow();
        //            row["ServiceId"] = lstdetails[i].ServiceId;
        //            row["ServiceName"] = lstdetails[i].ServiceName;
        //            row["ServicePrice"] = lstdetails[i].ServicePrice;
        //            row["BookingDate"] = lstdetails[i].BookingDate;
        //            row["BookingTime"] = lstdetails[i].BookingTime;
        //            table.Rows.Add(row);
        //        }
        //    }
        //    return table;
        //}

        public UserDetails GetUserDetails(int userid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("userid", userid, DbType.Int32);
            var result = dapper.Get<UserDetails>("[dbo].[SP_GETUSERDETAILS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }

        public string RandomString(int size, bool lowerCase = false)
        {
            Random _random = new Random();
            var builder = new StringBuilder(size);

            // Unicode/ASCII Letters are divided into two blocks
            // (Letters 65–90 / 97–122):
            // The first group containing the uppercase letters and
            // the second group containing the lowercase.  

            // char is a single Unicode character  
            char offset = lowerCase ? 'a' : 'A';
            const int lettersOffset = 26; // A...Z or a..z: length=26  

            for (var i = 0; i < size; i++)
            {
                var @char = (char)_random.Next(offset, offset + lettersOffset);
                builder.Append(@char);
            }

            return lowerCase ? builder.ToString().ToLower() : builder.ToString();
        }

        public Tuple<List<TempleOrderDetailService>, List<TempleOrderDetailServiceAccommodation>> GetTempleOrderDetails(string invoiceno)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("invoiceno", invoiceno, DbType.String);
            //var result = dapper.GetAll<TempleOrderDetail>("[dbo].[SP_GETTEMPLEORDERDETAILS]"
            //     , dbParam,
            //     commandType: CommandType.StoredProcedure);

            var result = dapper.GetMultipleResult1<TempleOrderDetailService, TempleOrderDetailServiceAccommodation>("[dbo].[SP_GETTEMPLEORDERDETAILS]", dbParam, commandType: CommandType.StoredProcedure);

            return result;

        }

        public Tuple<List<TempleOrderDetailService>, List<TempleOrderDetailServiceAccommodation>> GetTempleUserDashboard(int userId)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("userId", userId, DbType.Int32);
            //var result = dapper.GetAll<TempleUserDashboardModel>("[dbo].[SP_TempleUserDashboard]"
            //     , dbParam,
            //     commandType: CommandType.StoredProcedure);

            var result = dapper.GetMultipleResult1<TempleOrderDetailService, TempleOrderDetailServiceAccommodation>("[dbo].[SP_TempleUserDashboard]", dbParam, commandType: CommandType.StoredProcedure);

            return result;
        }
    }
}
