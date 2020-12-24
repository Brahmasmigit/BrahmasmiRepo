using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using System.Linq;

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
            var result = dapper.GetAll<Vendor>("[dbo].[SP_Get_AllVendors]", dbParam
                 , commandType: CommandType.StoredProcedure).ToList();
            return result.ToList();
        }
        
        public Vendor GetVendorProfile(int vendorID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("VendorID", vendorID, DbType.Int32);
            var result = dapper.Get<Vendor>("[dbo].[SP_Get_Vendorpreview]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;
        }
        //public Vendor GetVendorDetails(int vendorID)
        //{
        //    var dbParam = new DynamicParameters();
        //    dbParam.Add("VendorID", vendorID, DbType.Int32);
        //    var result = dapper.Get<Vendor>("[dbo].[SP_Get_VendorDetails]", dbParam
        //         , commandType: CommandType.StoredProcedure);
        //    return result;
        //}
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
        public List<VendorApplicationNumber> RegisterVendor(Vendor vendor)
        {
            var dbParam = new DynamicParameters();
            //var imageFile = vendor.Vendor_Photo;
            //var uploadFile = imageFile;
            //long length = uploadFile.Length;
            //byte[] bytes = new byte[length];
            //var reader = uploadFile.OpenReadStream();
            //reader.ReadAsync(bytes, 0, Convert.ToInt32(length));
            //reader.Close();
            List<VendorApplicationNumber> lstAppNumber = new List<VendorApplicationNumber>();
            string ApplicationNumber = "PT"+RandomString(8);
            dbParam.Add("Vendor_ApplicationNumber", ApplicationNumber, DbType.String);
            dbParam.Add("TitleID", vendor.TitleID, DbType.Int32);
            dbParam.Add("CountryID", vendor.CountryID, DbType.Int32);
            dbParam.Add("StateID", vendor.StateID, DbType.Int32);
            dbParam.Add("CityID", vendor.CityID, DbType.Int32);
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
            dbParam.Add("Vendor_DOB", vendor.Vendor_DOB, DbType.DateTime);
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

            dbParam.Add("Vendor_Nationality", vendor.Vendor_Nationality, DbType.String);
            dbParam.Add("Vendor_MaritalStatus", vendor.Vendor_MaritalStatus, DbType.String);
            dbParam.Add("Vendor_ResidentStatus", vendor.Vendor_ResidentStatus, DbType.String);
            dbParam.Add("EducationID", vendor.EducationID, DbType.Int32); 
            dbParam.Add("Vendor_Caste", vendor.Vendor_Caste, DbType.String);
            dbParam.Add("Vendor_SubCaste", vendor.Vendor_SubCaste, DbType.String);
            dbParam.Add("Vendor_Sutram", vendor.Vendor_Sutram, DbType.String);
            dbParam.Add("Vendor_Rishipravara", vendor.Vendor_Rishipravara, DbType.String);
            dbParam.Add("Vendor_MotherTongue", vendor.Vendor_MotherTongue, DbType.String);
            dbParam.Add("Vendor_VedicInstitutionName", vendor.Vendor_VedicInstitutionName, DbType.String);
            dbParam.Add("Vendor_VedicInstitutionLocation", vendor.Vendor_VedicInstitutionLocation, DbType.String);
            dbParam.Add("Vendor_VedicCourseName", vendor.Vendor_VedicCourseName, DbType.String);
            dbParam.Add("Vendor_VedicCoursePassedYear", vendor.Vendor_VedicCoursePassedYear, DbType.String);
            dbParam.Add("Vendor_OrganisationType", vendor.Vendor_OrganisationType, DbType.String);
            dbParam.Add("Vendor_OrganisationName", vendor.Vendor_OrganisationName, DbType.String);
            dbParam.Add("UserTypeID", vendor.UserTypeID, DbType.Int32);
            dbParam.Add("Vendor_PassportNumber", vendor.Vendor_PassportNumber, DbType.String);

            dbParam.Add("Vendor_BusinessYears", vendor.Vendor_BusinessYears, DbType.Int32);
            dbParam.Add("Vendor_AnnualIncome", vendor.Vendor_AnnualIncome, DbType.Decimal);
            dbParam.Add("Vendor_IncomeProof", vendor.Vendor_IncomeProof, DbType.String);
            dbParam.Add("Vendor_IdentityProof", vendor.Vendor_IdentityProof, DbType.String);
            dbParam.Add("Vendor_AddressProof", vendor.Vendor_AddressProof, DbType.String);
            dbParam.Add("Vendor_GSTIN", vendor.Vendor_GSTIN, DbType.String);
            dbParam.Add("Vendor_VedaShakha", vendor.Vendor_VedaShakha, DbType.String);

            DataTable dtCertifications = new DataTable();
            dtCertifications = GetCertifications(vendor.VendorCertifications);
            dbParam.Add("VendorCertifications", dtCertifications.AsTableValuedParameter("dbo.TT_VendorCertifications"));
            DataTable dtSocialNetwork = new DataTable();
            dtSocialNetwork = GetSocialNetwork(vendor.VendorSocialNetworks);
            dbParam.Add("VendorSocialNetworks", dtSocialNetwork.AsTableValuedParameter("dbo.TT_VendorSocialNetworks"));
            DataTable dtRelationShip = new DataTable();
            dtRelationShip = GetRelationShips(vendor.VendorRelationShips);
            dbParam.Add("VendorRelationShips", dtRelationShip.AsTableValuedParameter("dbo.TT_VendorRelationShip"));
            DataTable dtSpecialization = new DataTable();
            dtSpecialization = GetSpecializations(vendor.VendorSpecializations);
            dbParam.Add("VendorSpecializations", dtSpecialization.AsTableValuedParameter("dbo.TT_VendorSpecialization"));
            DataTable dtLanguages = new DataTable();
            dtLanguages = GetLanguages(vendor.VendorLanguages);
            dbParam.Add("VendorLanguages", dtLanguages.AsTableValuedParameter("dbo.TT_VendorLanguages"));
            DataTable dtIndustryType = new DataTable();
            dtIndustryType = GetIndustryTypes(vendor.VendorIndustryTypes);
            dbParam.Add("VendorIndustryTypes", dtIndustryType.AsTableValuedParameter("dbo.TT_VendorIndustryType"));
            DataTable dtVirtualPlatform = new DataTable();
            dtVirtualPlatform = GetVirtualPlatforms(vendor.VendorVirtualPlatforms);
            dbParam.Add("VendorVirtualPlatforms", dtVirtualPlatform.AsTableValuedParameter("dbo.TT_VendorVirtualPlatform"));
            //DataTable dtEducations = new DataTable();
            //dtEducations = GetEducations(vendor.VendorEducations);
            //dbParam.Add("VendorEducations", dtCertifications.AsTableValuedParameter("dbo.TT_VendorEducation"));
            //dbParam.Add("VendorRelationShips", vendor.VendorRelationShips);
            //dbParam.Add("VendorSpecializations", vendor.VendorSpecializations);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_Vendor]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            lstAppNumber.Add(new VendorApplicationNumber() { ApplicationNumber = ApplicationNumber,  Result = result });
            return lstAppNumber; 
        }
        public List<VendorOrder> VendorPayment(VendorPayment vendorPayment)
        {
            List<VendorOrder> lstOrder = new List<VendorOrder>();
            string invoiceNo = "INV" + RandomString(12);
            string orderNo = "VP" + RandomString(8);
            var dbParam = new DynamicParameters();
            dbParam.Add("@applicationnumber", vendorPayment.ApplicationNumber, DbType.String);
            dbParam.Add("@modeofpaymentid", vendorPayment.ModeofPayment, DbType.Int32);
            dbParam.Add("@paymentstatus", vendorPayment.PaymentStatus, DbType.Int32);
            dbParam.Add("@amountpaid", vendorPayment.AmountPaid, DbType.Int32);
            dbParam.Add("@invoiceno", invoiceNo, DbType.String);
            dbParam.Add("@bookingstatusid", vendorPayment.BookingStatusId, DbType.Int32);
            dbParam.Add("@membershipid", vendorPayment.MembershipId, DbType.Int32);
            dbParam.Add("@orderNo", orderNo, DbType.String);

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[sp_vendorpayment]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            lstOrder.Add(new VendorOrder() { InvoiceNo= invoiceNo, Result = result });
            return lstOrder;

        }
      
        public int UpdateVendor(Vendor vendor)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("VendorID", vendor.VendorID, DbType.Int32);
            dbParam.Add("TitleID", vendor.TitleID, DbType.Int32);
            dbParam.Add("CountryID", vendor.CountryID, DbType.Int32);
            dbParam.Add("StateID", vendor.StateID, DbType.Int32);
            dbParam.Add("CityID", vendor.CityID, DbType.Int32);
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
            dbParam.Add("UserTypeID", vendor.UserTypeID, DbType.String);
            dbParam.Add("Vendor_PassportNumber", vendor.Vendor_PassportNumber, DbType.String);
            dbParam.Add("Vendor_AreasOfActivity", vendor.Vendor_AreasOfActivity, DbType.String);
            DataTable dtCertifications = new DataTable();
            dtCertifications = GetCertifications(vendor.VendorCertifications);
            dbParam.Add("VendorCertifications", dtCertifications.AsTableValuedParameter("dbo.TT_VendorCertifications"));
            DataTable dtSocialNetwork = new DataTable();
            dtSocialNetwork = GetSocialNetwork(vendor.VendorSocialNetworks);
            dbParam.Add("VendorSocialNetworks", dtSocialNetwork.AsTableValuedParameter("dbo.TT_VendorSocialNetworks"));
            DataTable dtRelationShip = new DataTable();
            dtRelationShip = GetRelationShips(vendor.VendorRelationShips);
            dbParam.Add("VendorRelationShips", dtRelationShip.AsTableValuedParameter("dbo.TT_VendorRelationShip"));
            DataTable dtSpecialization = new DataTable();
            dtSpecialization = GetSpecializations(vendor.VendorSpecializations);
            dbParam.Add("VendorSpecializations", dtSpecialization.AsTableValuedParameter("dbo.TT_VendorSpecialization"));
            DataTable dtLanguages = new DataTable();
            dtLanguages = GetLanguages(vendor.VendorLanguages);
            dbParam.Add("VendorLanguages", dtLanguages.AsTableValuedParameter("dbo.TT_VendorLanguages"));
            DataTable dtIndustryType = new DataTable();
            dtIndustryType = GetIndustryTypes(vendor.VendorIndustryTypes);
            dbParam.Add("VendorIndustryTypes", dtIndustryType.AsTableValuedParameter("dbo.TT_VendorIndustryType"));
            DataTable dtVirtualPlatform = new DataTable();
            dtVirtualPlatform = GetVirtualPlatforms(vendor.VendorVirtualPlatforms);
            dbParam.Add("VendorVirtualPlatforms", dtVirtualPlatform.AsTableValuedParameter("dbo.TT_VendorVirtualPlatform"));
            //dbParam.Add("VendorRelationShips", vendor.VendorRelationShips);
            //dbParam.Add("VendorSpecializations", vendor.VendorSpecializations);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Update_Vendor]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public DataTable GetCertifications(List<VendorCertification> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            table.Columns.Add("CertificationID", typeof(int));
            //table.Columns.Add("IsChecked", typeof(bool));
            //table.Columns.Add("", typeof(bool));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    if (lstdetails[i].IsChecked == true)
                    {
                        row["VendorID"] = lstdetails[i].VendorID;
                        row["CertificationID"] = lstdetails[i].CertificationID;
                        table.Rows.Add(row);
                    }

                }
            }
            return table;

        }
        public DataTable GetRelationShips(List<VendorRelationShip> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("RelationShipName", typeof(string));
            table.Columns.Add("VendorID", typeof(int));
    
            table.Columns.Add("Name", typeof(string));
            table.Columns.Add("Gender", typeof(string));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    row["RelationShipName"] = lstdetails[i].RelationShipName;
                    row["VendorID"] = lstdetails[i].VendorID;
       
                    row["Name"] = lstdetails[i].Name;
                    row["Gender"] = lstdetails[i].Gender;
                    table.Rows.Add(row);
                }
            }
            return table;
        }
        public DataTable GetSpecializations(List<VendorSpecialization> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            table.Columns.Add("SpecializationName", typeof(string));

            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    row["VendorID"] = lstdetails[i].VendorID;
                    row["SpecializationName"] = lstdetails[i].SpecializationName;
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
                    if (lstdetails[i].SocialNetworkURL != null)
                    {
                        row["VendorID"] = lstdetails[i].VendorID;
                        row["SocialNetworkID"] = lstdetails[i].SocialNetworkID;
                        row["SocialNetworkURL"] = lstdetails[i].SocialNetworkURL;
                        table.Rows.Add(row);
                    }

                }
            }
            return table;

        }
        public DataTable GetVirtualPlatforms(List<VendorVirtualPlatform> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            table.Columns.Add("VirtualPlatformID", typeof(int));
            table.Columns.Add("VideoCallPlatformLink", typeof(string));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    if (lstdetails[i].VideoCallPlatformLink != null)
                    {
                        row["VendorID"] = lstdetails[i].VendorID;
                        row["VirtualPlatformID"] = lstdetails[i].VirtualPlatformID;
                        row["VideoCallPlatformLink"] = lstdetails[i].VideoCallPlatformLink;
                        table.Rows.Add(row);
                    }

                }
            }
            return table;
        }
        public DataTable GetEducations(List<VendorEducation> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            table.Columns.Add("EducationID", typeof(int));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    if (lstdetails[i].IsChecked == true)
                    {
                        row["VendorID"] = lstdetails[i].VendorID;
                        row["EducationID"] = lstdetails[i].EducationID;
                        table.Rows.Add(row);
                    }

                }
            }
            return table;
        }
        public DataTable GetLanguages(List<VendorLanguage> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            table.Columns.Add("LanguageID", typeof(int));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    if (lstdetails[i].IsChecked == true)
                    {
                        row["VendorID"] = lstdetails[i].VendorID;
                        row["LanguageID"] = lstdetails[i].LanguageID;
                        table.Rows.Add(row);
                    }

                }
            }
            return table;
        }
        public DataTable GetIndustryTypes(List<VendorIndustryType> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("VendorID", typeof(int));
            table.Columns.Add("IndustryTypeID", typeof(int));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    if (lstdetails[i].IsChecked == true)
                    {
                        row["VendorID"] = lstdetails[i].VendorID;
                        row["IndustryTypeID"] = lstdetails[i].IndustryTypeID;
                        table.Rows.Add(row);
                    }

                }
            }
            return table;
        }
     
        public Tuple<Vendor, List<VendorCertification>, List<VendorSocialNetwork>, List<VendorRelationShip>, List<VendorSpecialization>> GetVendorDetails(int VendorID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("VendorID", VendorID, DbType.Int32);
            var result = dapper.GetMultipleResult<Vendor, VendorCertification, VendorSocialNetwork, VendorRelationShip, VendorSpecialization>("[dbo].[SP_Get_VendorDetails]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int UploadPhoto(IFormFile imageFile, Vendor vendor)
        {
            var dbParam = new DynamicParameters();
            // var uploadFile = Request.Form.Files[0];
            var uploadFile = imageFile;
            long length = uploadFile.Length;
            byte[] bytes = new byte[length];
            var reader = uploadFile.OpenReadStream();
            reader.ReadAsync(bytes, 0, Convert.ToInt32(length));
            reader.Close();


   
            dbParam.Add("VendorID", vendor.VendorID, DbType.Int32);
          
            dbParam.Add("Vendor_Photo", bytes, DbType.Binary);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Update_VendorPhoto]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        
    }
}

