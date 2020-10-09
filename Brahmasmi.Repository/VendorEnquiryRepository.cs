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
    public class VendorEnquiryRepository:IVendorEnquiryRepository
    {
        private readonly IDapper dapper;
        public VendorEnquiryRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int VendorEnquiry(VendorEnquiry vendorEnquiry)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("Name", vendorEnquiry.Name, DbType.String);
            dbParam.Add("MobileNumber", vendorEnquiry.MobileNumber, DbType.String);
            dbParam.Add("EmailID", vendorEnquiry.EmailID, DbType.String);
            dbParam.Add("Description", vendorEnquiry.Description, DbType.String);
            dbParam.Add("CityID", vendorEnquiry.CityID, DbType.Int32);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_InsertVendorEnquiry]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<VendorEnquiry> GetVendor()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<VendorEnquiry>("[dbo].[SP_Admin_GetVendorEnquiry]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure).ToList(); 
            return result.ToList();

        }
       
    }
}


