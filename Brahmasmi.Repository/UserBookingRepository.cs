using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using CCA.Util;
using System.Linq;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class UserBookingRepository : IUserBookingRepository
    {
        private readonly IDapper dapper;
        private readonly IConfiguration configuration;
        private CCACrypto _cCACrypto;
        public UserBookingRepository(IDapper _dapper, IConfiguration _configuration)
        {
            dapper = _dapper;
            configuration = _configuration;
            _cCACrypto = new CCACrypto();
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
                dbParam.Add("ProductID", userBooking[i].ProductID, DbType.Int32);
                dbParam.Add("ProductPrice", userBooking[i].ItemPrice, DbType.Decimal);

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
                dbParam.Add("@Description", userBooking[i].Description, DbType.String);

                dbParam.Add("@ORDERNO", userBooking[i].OrderNO, DbType.String);
                dbParam.Add("@PAYMENTMODE", userBooking[i].PaymentMode, DbType.Int32);
                dbParam.Add("@PAYMENTSTATUS", userBooking[i].PaymentStatus, DbType.Int32);
                dbParam.Add("@INVOICENO", userBooking[i].InvoiceNo, DbType.String);
                dbParam.Add("@TOTALAMOUNT", userBooking[i].Total, DbType.Int32);

                if (!(userBooking[i].VendorList == null))
                {
                    DataTable multipleVendorData = GetMultipleVendorDataTable(userBooking[i].VendorList);
                    dbParam.Add("@MultipleVendorData", multipleVendorData.AsTableValuedParameter("dbo.TT_MultipleVendorData"));
                }

                dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
                result = dapper.Execute("[dbo].[SP_USERBOOKING]"
                    , dbParam,
                    commandType: CommandType.StoredProcedure);
                listOrders.Add(new Orders() { OrderNO = userBooking[i].OrderNO, InvoiceNo= invoiceNo, Result = result });

            }
            string mId = configuration.GetSection("CCAvenuePaymentSettings").GetSection("MerchantId").Value;
            string wKey = configuration.GetSection("CCAvenuePaymentSettings").GetSection("WorkingKey").Value;

            var orderDetailsData = userBooking[0].InvoiceNo + "$" + userBooking[0].BookingType;

            string encryData = "merchant_id=" + mId + "&order_id=" + listOrders[0].InvoiceNo + "&billing_name=" + userBooking[0].UserName + "&billing_address=" + userBooking[0].BookingLocation +
                    "&billing_zip=" + userBooking[0].PinCode + "&billing_tel=" + userBooking[0].MobileNumber + "&billing_email=" + userBooking[0].EmailId + "&amount=" + userBooking[0].Total + "&merchant_param1=" + orderDetailsData + "&currency=INR&redirect_url=https://brahmasmiapi.azurewebsites.net/api/UserBooking/ChangeStatus&cancel_url=https://brahmasmiapi.azurewebsites.net/api/Payment/InitializePayment&language=en";

            var encrypReq = _cCACrypto.Encrypt(encryData, wKey);

            listOrders[0].EncryptedResult = encrypReq;

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

        public DataTable GetMultipleVendorDataTable(List<VendorData> lstVendor)
        {

            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            if (lstVendor.Count > 0)
            {
                for (int i = 0; i < lstVendor.Count; i++)
                {
                    var row = table.NewRow();
                    row["VendorID"] = lstVendor[i].VendorID;                    
                    table.Rows.Add(row);
                }
            }
            return table;
        }
        public string ChangeResponseStatus(string response)
        {
            string Invoice = string.Empty;
            string OrderDetailsData = string.Empty;
            try
            {
                string wKey = configuration.GetSection("CCAvenuePaymentSettings").GetSection("WorkingKey").Value;

                var decrypReq = _cCACrypto.Decrypt(response, wKey);
                //var decrypReq = "";
                List<string> DataSplit = decrypReq.Split('&').ToList();

                for (var i = 0; i < DataSplit.Count; i++)
                {
                    if (DataSplit[i].Contains("order_id"))
                    {
                        Invoice = DataSplit[i].Split('=')[1];
                    }
                    if (DataSplit[i].Contains("merchant_param1"))
                    {
                        OrderDetailsData = DataSplit[i].Split('=')[1];
                    }
                    if (Invoice != null && OrderDetailsData != null)
                        break;
                }

                var dbParam = new DynamicParameters();
                dbParam.Add("Invoice", Invoice, DbType.String);
                dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);

                var result = dapper.Execute("[dbo].[SP_ChangePaymentResultStatus]"
                        , dbParam,
                        commandType: CommandType.StoredProcedure);

                return OrderDetailsData;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
