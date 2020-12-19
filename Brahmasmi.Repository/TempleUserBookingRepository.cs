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
    public class TempleUserBookingRepository : ITempleUserBookingRepository
    {
        private readonly IDapper dapper;
        public TempleUserBookingRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        //public List<TempleOrders> UserBooking(List<TempleUserBooking> userBooking)
        //{
        //    int result=0;
        //    List<TempleOrders> listOrders = new List<TempleOrders>();
        //    string invoiceNo= RandomString(10); 
        //    for (int i = 0; i < userBooking.Count; i++)
        //    {
        //        userBooking[i].OrderNO = RandomString(8);
        //        userBooking[i].InvoiceNo = invoiceNo;
        //        var dbParam = new DynamicParameters();
        //        dbParam.Add("UserId", userBooking[i].UserId, DbType.Int32);
        //        dbParam.Add("BookingStatusId", userBooking[i].BookingStatusId, DbType.Int32);
        //        dbParam.Add("ServiceId", userBooking[i].ServiceId, DbType.Int32);
        //        dbParam.Add("ServiceTypeId", userBooking[i].ServiceTypeId, DbType.Int32);
        //        dbParam.Add("VendorId", userBooking[i].VendorId, DbType.Int32);
        //        dbParam.Add("ReviewComments", userBooking[i].ReviewComments, DbType.String);
        //        dbParam.Add("BookingType", userBooking[i].BookingType, DbType.String);
        //        dbParam.Add("BookingLocation", userBooking[i].BookingLocation, DbType.String);
        //        dbParam.Add("BookingDate", userBooking[i].BookingDate, DbType.DateTime);
        //        dbParam.Add("BookingTime", userBooking[i].BookingTime, DbType.Time);

        //        dbParam.Add("ISDIFFERENTLOCATION", userBooking[i].IsDifferentLocation, DbType.String);
        //        dbParam.Add("@CITYID", userBooking[i].CityId, DbType.Int32);
        //        dbParam.Add("@PINCODE", userBooking[i].PinCode, DbType.String);
        //        dbParam.Add("@NEWCITYID", userBooking[i].NewCItyId, DbType.Int32);
        //        dbParam.Add("@NEWPINCODE", userBooking[i].NewPinCode, DbType.String);
        //        dbParam.Add("@NEWADDRESS", userBooking[i].NewAddress, DbType.String);
        //        dbParam.Add("@USERNAME", userBooking[i].UserName, DbType.String);
        //        dbParam.Add("@MOBILENUMBER", userBooking[i].MobileNumber, DbType.String);
        //        dbParam.Add("@EMAILID", userBooking[i].EmailId, DbType.String);
        //        dbParam.Add("@PACKAGEID", userBooking[i].PackageId, DbType.Int32);

        //        dbParam.Add("@ORDERNO", userBooking[i].OrderNO, DbType.String);
        //        dbParam.Add("@PAYMENTMODE", userBooking[i].PaymentMode, DbType.Int32);
        //        dbParam.Add("@PAYMENTSTATUS", userBooking[i].PaymentStatus, DbType.Int32);
        //        dbParam.Add("@INVOICENO", userBooking[i].InvoiceNo, DbType.String);
        //        dbParam.Add("@TOTALAMOUNT", userBooking[i].Total, DbType.Int32);

        //        dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
        //        result = dapper.Execute("[dbo].[SP_TEMPLEUSERBOOKING]"
        //            , dbParam,
        //            commandType: CommandType.StoredProcedure);
        //        listOrders.Add(new TempleOrders() { OrderNO = userBooking[i].OrderNO, InvoiceNo= invoiceNo, Result = result });
        //    }
        //    return listOrders;
        //}

        public void UserBooking12()
        {

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
                dbParam.Add("UserId", userBooking.UserId, DbType.Int32);
                dbParam.Add("BookingStatusId", userBooking.BookingStatusId, DbType.Int32);

                dbParam.Add("ServiceId", userBooking.ServiceDetails[i].ServiceId, DbType.Int32);
                dbParam.Add("ServiceName", userBooking.ServiceDetails[i].ServiceName, DbType.String);
                dbParam.Add("ServicePrice", userBooking.ServiceDetails[i].ServicePrice, DbType.Int64);

                dbParam.Add("BookingType", "Temple", DbType.String);
                dbParam.Add("BookingLocation", userBooking.BookingLocation, DbType.String);
                dbParam.Add("TempleId", userBooking.TempleId, DbType.Int32);
                dbParam.Add("UserQuery", userBooking.UserQuery, DbType.String);

                dbParam.Add("RoomTypeId", userBooking.RoomTypeId);
                dbParam.Add("RoomType", userBooking.RoomType);
                dbParam.Add("RoomPrice", userBooking.RoomPrice);

                dbParam.Add("DarshanTypeId", userBooking.DarshanTypeId);
                dbParam.Add("DarshanType", userBooking.DarshanType);
                dbParam.Add("DarshanPrice", userBooking.DarshanPrice);

                dbParam.Add("BookingDate", userBooking.ServiceDetails[i].BookingDate, DbType.DateTime);
                dbParam.Add("BookingTime", userBooking.ServiceDetails[i].BookingTime, DbType.Time);

                dbParam.Add("@CITYID", userBooking.CityId, DbType.Int32);
                dbParam.Add("@PINCODE", userBooking.PinCode, DbType.String);
                dbParam.Add("@NEWCITYID", userBooking.NewCItyId, DbType.Int32);
                dbParam.Add("@NEWPINCODE", userBooking.NewPinCode, DbType.String);

                dbParam.Add("@NEWADDRESS", userBooking.NewAddress, DbType.String);
                dbParam.Add("@USERNAME", userBooking.UserName, DbType.String);
                dbParam.Add("@MOBILENUMBER", userBooking.MobileNumber, DbType.String);
                dbParam.Add("@EMAILID", userBooking.EmailId, DbType.String);
                dbParam.Add("@PACKAGEID", userBooking.PackageId, DbType.Int32);

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
            return listOrders;
        }

        //public List<TempleOrders> UserBooking(TempleUserBooking userBooking)
        //{
        //    int result = 0;
        //    List<TempleOrders> listOrders = new List<TempleOrders>();
        //    string invoiceNo = RandomString(10);
        //    //for (int i = 0; i < userBooking.Count; i++)
        //    //{
        //    userBooking.OrderNO = RandomString(8);
        //    userBooking.InvoiceNo = invoiceNo;
        //    var dbParam = new DynamicParameters();
        //    dbParam.Add("UserId", userBooking.UserId, DbType.Int32);
        //    dbParam.Add("BookingStatusId", userBooking.BookingStatusId, DbType.Int32);
        //    //dbParam.Add("ServiceId", userBooking.ServiceId, DbType.Int32);
        //    //dbParam.Add("ServiceTypeId", userBooking.ServiceTypeId, DbType.Int32);
        //    //dbParam.Add("VendorId", userBooking.VendorId, DbType.Int32);
        //    //dbParam.Add("ReviewComments", userBooking.ReviewComments, DbType.String);
        //    dbParam.Add("BookingType", "Temple", DbType.String);
        //    dbParam.Add("BookingLocation", userBooking.BookingLocation, DbType.String);
        //    dbParam.Add("TempleId", userBooking.TempleId, DbType.Int32);
        //    dbParam.Add("UserQuery", userBooking.UserQuery, DbType.String);

        //    dbParam.Add("RoomTypeId", userBooking.RoomTypeId);
        //    dbParam.Add("RoomType", userBooking.RoomType);
        //    dbParam.Add("RoomPrice", userBooking.RoomPrice);

        //    dbParam.Add("DarshanTypeId", userBooking.DarshanTypeId);
        //    dbParam.Add("DarshanType", userBooking.DarshanType);
        //    dbParam.Add("DarshanPrice", userBooking.DarshanPrice);

        //    //dbParam.Add("BookingDate", userBooking.BookingDate, DbType.DateTime);
        //    //dbParam.Add("BookingTime", userBooking.BookingTime, DbType.Time);

        //    //dbParam.Add("ISDIFFERENTLOCATION", userBooking.IsDifferentLocation, DbType.String);
        //    dbParam.Add("@CITYID", userBooking.CityId, DbType.Int32);
        //    dbParam.Add("@PINCODE", userBooking.PinCode, DbType.String);
        //    dbParam.Add("@NEWCITYID", userBooking.NewCItyId, DbType.Int32);
        //    dbParam.Add("@NEWPINCODE", userBooking.NewPinCode, DbType.String);
        //    dbParam.Add("@NEWADDRESS", userBooking.NewAddress, DbType.String);
        //    dbParam.Add("@USERNAME", userBooking.UserName, DbType.String);
        //    dbParam.Add("@MOBILENUMBER", userBooking.MobileNumber, DbType.String);
        //    dbParam.Add("@EMAILID", userBooking.EmailId, DbType.String);
        //    dbParam.Add("@PACKAGEID", userBooking.PackageId, DbType.Int32);

        //    dbParam.Add("@ORDERNO", userBooking.OrderNO, DbType.String);
        //    dbParam.Add("@PAYMENTMODE", userBooking.PaymentMode, DbType.Int32);
        //    dbParam.Add("@PAYMENTSTATUS", userBooking.PaymentStatus, DbType.Int32);
        //    dbParam.Add("@INVOICENO", userBooking.InvoiceNo, DbType.String);
        //    dbParam.Add("@TOTALAMOUNT", userBooking.Total, DbType.Int32);

        //    DataTable serviceBooking = new DataTable();
        //    serviceBooking = GetServiceBookingDetails(userBooking.ServiceDetails);
        //    dbParam.Add("ServiceBooking", serviceBooking.AsTableValuedParameter("dbo.TT_ServiceBooking"));

        //    dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
        //    result = dapper.Execute("[dbo].[SP_TEMPLEUSERBOOKING]"
        //        , dbParam,
        //        commandType: CommandType.StoredProcedure);
        //    listOrders.Add(new TempleOrders() { OrderNO = userBooking.OrderNO, InvoiceNo = invoiceNo, Result = result });
        //    //}
        //    return listOrders;
        //}

        public DataTable GetServiceBookingDetails(List<UserServiceDetails> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("ServiceId", typeof(int));
            table.Columns.Add("ServiceName", typeof(string));
            table.Columns.Add("ServicePrice", typeof(double));
            table.Columns.Add("BookingDate", typeof(DateTime));
            table.Columns.Add("BookingTime", typeof(string));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count; i++)
                {
                    var row = table.NewRow();
                    row["ServiceId"] = lstdetails[i].ServiceId;
                    row["ServiceName"] = lstdetails[i].ServiceName;
                    row["ServicePrice"] = lstdetails[i].ServicePrice;
                    row["BookingDate"] = lstdetails[i].BookingDate;
                    row["BookingTime"] = lstdetails[i].BookingTime;
                    table.Rows.Add(row);
                }
            }
            return table;
        }

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

        public List<TempleOrderDetail> GetTempleOrderDetails(string invoiceno)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("invoiceno", invoiceno, DbType.String);
            var result = dapper.GetAll<TempleOrderDetail>("[dbo].[SP_GETTEMPLEORDERDETAILS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }

        public List<TempleUserDashboardModel> GetTempleUserDashboard(int userId)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("userId", userId, DbType.Int32);
            var result = dapper.GetAll<TempleUserDashboardModel>("[dbo].[SP_TempleUserDashboard]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
