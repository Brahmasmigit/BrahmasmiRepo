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
    public class UserBookingRepository : IUserBookingRepository
    {
        private readonly IDapper dapper;
        public UserBookingRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<Orders> UserBooking(List<UserBooking> userBooking)
        {
            int result=0;
            List<Orders> listOrders = new List<Orders>();
            string invoiceNo= RandomString(10); 
            for (int i = 0; i < userBooking.Count; i++)
            {
                userBooking[i].OrderNO = RandomString(8);
                userBooking[i].InvoiceNo = invoiceNo;
                var dbParam = new DynamicParameters();
                dbParam.Add("UserId", userBooking[i].UserId, DbType.Int32);
                dbParam.Add("BookingStatusId", userBooking[i].BookingStatusId, DbType.Int32);
                dbParam.Add("ServiceId", userBooking[i].ServiceId, DbType.Int32);
                dbParam.Add("ServiceTypeId", userBooking[i].ServiceTypeId, DbType.Int32);
                dbParam.Add("VendorId", userBooking[i].VendorId, DbType.Int32);
                dbParam.Add("ReviewComments", userBooking[i].ReviewComments, DbType.String);
                dbParam.Add("BookingType", userBooking[i].BookingType, DbType.String);
                dbParam.Add("BookingLocation", userBooking[i].BookingLocation, DbType.String);
                dbParam.Add("BookingDate", userBooking[i].BookingDate, DbType.DateTime);
                dbParam.Add("BookingTime", userBooking[i].BookingTime, DbType.Time);

                dbParam.Add("ISDIFFERENTLOCATION", userBooking[i].IsDifferentLocation, DbType.String);
                dbParam.Add("@CITYID", userBooking[i].CityId, DbType.Int32);
                dbParam.Add("@PINCODE", userBooking[i].PinCode, DbType.String);
                dbParam.Add("@NEWCITYID", userBooking[i].NewCItyId, DbType.Int32);
                dbParam.Add("@NEWPINCODE", userBooking[i].NewPinCode, DbType.String);
                dbParam.Add("@NEWADDRESS", userBooking[i].NewAddress, DbType.String);
                dbParam.Add("@USERNAME", userBooking[i].UserName, DbType.String);
                dbParam.Add("@MOBILENUMBER", userBooking[i].MobileNumber, DbType.String);
                dbParam.Add("@EMAILID", userBooking[i].EmailId, DbType.String);
                dbParam.Add("@PACKAGEID", userBooking[i].PackageId, DbType.Int32);
                dbParam.Add("@LanguageId", userBooking[i].LanguageId, DbType.Int32);
                dbParam.Add("@VendorList", userBooking[i].VendorList, DbType.String);
                dbParam.Add("@Description", userBooking[i].Description, DbType.String);

                dbParam.Add("@ORDERNO", userBooking[i].OrderNO, DbType.String);
                dbParam.Add("@PAYMENTMODE", userBooking[i].PaymentMode, DbType.Int32);
                dbParam.Add("@PAYMENTSTATUS", userBooking[i].PaymentStatus, DbType.Int32);
                dbParam.Add("@INVOICENO", userBooking[i].InvoiceNo, DbType.String);
                dbParam.Add("@TOTALAMOUNT", userBooking[i].Total, DbType.Int32);

                dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
                result = dapper.Execute("[dbo].[SP_USERBOOKING]"
                    , dbParam,
                    commandType: CommandType.StoredProcedure);
                listOrders.Add(new Orders() { OrderNO = userBooking[i].OrderNO, InvoiceNo= invoiceNo, Result = result });
            }
            return listOrders;
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
    }
}
