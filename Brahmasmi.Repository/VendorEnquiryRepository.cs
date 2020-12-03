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
            dbParam.Add("AltMobileNumber", vendorEnquiry.AltMobileNumber, DbType.String);
            dbParam.Add("Address1", vendorEnquiry.Address1, DbType.String);
            dbParam.Add("LanguageId", vendorEnquiry.LanguageId, DbType.Int32);
            dbParam.Add("Gothram", vendorEnquiry.Gothram, DbType.String);
            dbParam.Add("Rishipravara", vendorEnquiry.Rishipravara, DbType.String);
            vendorEnquiry.DOB = vendorEnquiry.DOB !="" ? vendorEnquiry.DOB : null;
            dbParam.Add("DOB", vendorEnquiry.DOB, DbType.DateTime);
            dbParam.Add("Address2", vendorEnquiry.Address2, DbType.String);
            dbParam.Add("StateId", vendorEnquiry.StateID, DbType.Int32);
            dbParam.Add("CountryId", vendorEnquiry.CountryId, DbType.Int32);
            dbParam.Add("Vedashaka", vendorEnquiry.Vedashaka, DbType.String);
            dbParam.Add("Language", vendorEnquiry.Language, DbType.String);
            dbParam.Add("UserType", vendorEnquiry.UserType, DbType.Int32);
            dbParam.Add("PinCode", vendorEnquiry.PinCode, DbType.String);
            DataTable dtLanguages = new DataTable();
            dtLanguages = GetLanguages(vendorEnquiry.ListLanguages);
            dbParam.Add("EnquiryLanguage", dtLanguages.AsTableValuedParameter("dbo.TT_EnquiryLanguage"));
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_InsertVendorEnquiry]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public DataTable GetLanguages(List<EnquiryLanguages> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("EnquiryId", typeof(int));
            table.Columns.Add("LanguageId", typeof(int));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    if (lstdetails[i].IsChecked == true)
                    {
                        row["EnquiryId"] = lstdetails[i].EnquiryId;
                        row["LanguageId"] = lstdetails[i].LanguageID;
                        table.Rows.Add(row);
                    }

                }
            }
            return table;

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


