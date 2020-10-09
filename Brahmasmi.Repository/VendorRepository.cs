using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using System.Reflection;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class VendorRepository : IVendorRepository
    {
       
       
            private readonly IDapper dapper;
            public VendorRepository(IDapper _dapper)
            {
                dapper = _dapper;
            }
            public List<Vendor> GetAllVendor()
            {
            var dbParam = new DynamicParameters();
            // dbParam = DBNull.Value;
            var result = dapper.GetAll<Vendor>("[dbo].[SP_Get_AllVendors]", dbParam
                 , commandType: CommandType.StoredProcedure).ToList();
            return result.ToList();
            }

            public int RegisterVendor(Vendor vendor)
            {
                var dbParam = new DynamicParameters();
                dbParam.Add("TitleID", vendor.TitleID, DbType.Int32);
                dbParam.Add("Vendor_FirstName", vendor.Vendor_FirstName, DbType.String);
                dbParam.Add("Vendor_MiddleName", vendor.Vendor_MiddleName, DbType.String);
                dbParam.Add("Vendor_LastName", vendor.Vendor_LastName, DbType.String);
                dbParam.Add("Vendor_NickName", vendor.Vendor_NickName, DbType.String);
                dbParam.Add("Vendor_Gothram", vendor.Vendor_Gothram, DbType.String);
                dbParam.Add("Vendor_FatherName", vendor.Vendor_FatherName, DbType.String);
                dbParam.Add("Vendor_Gender", vendor.Vendor_Gender, DbType.String);
                dbParam.Add("Vendor_Occupation", vendor.Vendor_Occupation, DbType.String);
                dbParam.Add("Vendor_Height", vendor.Vendor_Height, DbType.Decimal);
                dbParam.Add("Vendor_Weight", vendor.Vendor_Weight, DbType.Decimal);
                dbParam.Add("Vendor_DOB", vendor.Vendor_DOB, DbType.String);
                dbParam.Add("Vendor_Age", vendor.Vendor_Age, DbType.Int32);
                dbParam.Add("Vendor_PlaceofBirth", vendor.Vendor_PlaceofBirth, DbType.String);
                dbParam.Add("Vendor_Address1", vendor.Vendor_Address1, DbType.String);
                dbParam.Add("Vendor_PinCode1", vendor.Vendor_PinCode1, DbType.String);
                dbParam.Add("Vendor_Address2", vendor.Vendor_Address2, DbType.String);
                dbParam.Add("Vendor_PinCode2", vendor.Vendor_PinCode2, DbType.String);
                dbParam.Add("Vendor_MobileNumber", vendor.Vendor_MobileNumber, DbType.String);
                dbParam.Add("Vendor_AlternateNumber", vendor.Vendor_AlternateNumber, DbType.String);
                dbParam.Add("Vendor_EmailID", vendor.Vendor_EmailID, DbType.String);
                dbParam.Add("Vendor_PANNumber", vendor.Vendor_PANNumber, DbType.String);
                dbParam.Add("Vendor_AadharNumber", vendor.Vendor_AadharNumber, DbType.String);
                dbParam.Add("Vendor_IdentificationMark1", vendor.Vendor_IdentificationMark1, DbType.String);
                dbParam.Add("Vendor_IdentificationMark2", vendor.Vendor_IdentificationMark2, DbType.String);
                dbParam.Add("Vendor_EmergencyContactPerson", vendor.Vendor_EmergencyContactPerson, DbType.String);
                dbParam.Add("Vendor_EmergencyContactNumber", vendor.Vendor_EmergencyContactNumber, DbType.String);
                dbParam.Add("Vendor_NameOnPassBook", vendor.Vendor_NameOnPassBook, DbType.String);
                dbParam.Add("Vendor_BankName", vendor.Vendor_BankName, DbType.String);
                dbParam.Add("Vendor_AccountNumber", vendor.Vendor_AccountNumber, DbType.String);
                dbParam.Add("Vendor_IFSCCode", vendor.Vendor_IFSCCode, DbType.String);
                dbParam.Add("Vendor_MICRCode", vendor.Vendor_MICRCode, DbType.String);
                dbParam.Add("Vendor_AreasOfActivity", vendor.Vendor_AreasOfActivity, DbType.String);
                DataTable dtCertifications = new DataTable();
                dtCertifications = GetCertifications(vendor.VendorCertifications);
                dbParam.Add("VendorCertifications", dtCertifications.AsTableValuedParameter("dbo.TT_VendorCertifications"));
                DataTable dtSocialNetwork = new DataTable();
                dtSocialNetwork = GetSocialNetwork(vendor.VendorSocialNetworks);
                dbParam.Add("VendorSocialNetworks", dtSocialNetwork.AsTableValuedParameter("dbo.TT_VendorSocialNetworks"));
                //dbParam.Add("VendorRelationShips", vendor.VendorRelationShips);
                //dbParam.Add("VendorSpecializations", vendor.VendorSpecializations);
                dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
                    var result = dapper.Execute("[dbo].[SP_Insert_Vendor]"
                         , dbParam,
                         commandType: CommandType.StoredProcedure);
                    return result;
            }
        public DataTable GetCertifications(List<VendorCertification> lstdetails)
        {
           
            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            table.Columns.Add("CertificationID", typeof(int));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    row["VendorID"] = lstdetails[i].VendorID;
                    row["CertificationID"] = lstdetails[i].CertificationID;
                    table.Rows.Add(row);
                }
            }
            return table;

        }
        public DataTable GetSocialNetwork(List<VendorSocialNetwork> lstdetails)
        {
            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            table.Columns.Add("SocialNetworkID", typeof(int));
            table.Columns.Add("SocialNetworkURL", typeof(string));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    row["VendorID"] = lstdetails[i].VendorID;
                    row["SocialNetworkID"] = lstdetails[i].SocialNetworkID;
                    row["SocialNetworkURL"] = lstdetails[i].SocialNetworkURL;
                    table.Rows.Add(row);
                }
            }
            return table;

        }
    }
    }

