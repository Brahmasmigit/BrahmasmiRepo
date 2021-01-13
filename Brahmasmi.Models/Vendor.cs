using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Brahmasmi.Models
{
    public class Vendor
    {
        public string Vendor_ApplicationNumber { get; set; }
        public int VendorID { get; set; }
        public int UserTypeID { get; set; }
        public int? TitleID { get; set; }
        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
        public string Vendor_FirstName { get; set; }
        public string Vendor_MiddleName { get; set; }
        public string Vendor_LastName { get; set; }
        public string Vendor_NickName { get; set; }
        public string Vendor_Gothram { get; set; }
        public string Vendor_FatherName { get; set; }
        public string Vendor_Gender { get; set; }
        public string Vendor_Occupation { get; set; }
        public decimal Vendor_Height { get; set; }
        public decimal Vendor_Weight { get; set; }
        public string Vendor_DOB { get; set; }
        public int Vendor_Age { get; set; }
        public string Vendor_PlaceofBirth { get; set; }
        public string Vendor_Address1 { get; set; }
        public string Vendor_PinCode1 { get; set; }
        public string Vendor_Address2 { get; set; }
        public string Vendor_PinCode2 { get; set; }
        public string Vendor_MobileNumber { get; set; }
        public string Vendor_AlternateNumber { get; set; }
        public string Vendor_EmailID { get; set; }
        public string Vendor_PANNumber { get; set; }
        public string Vendor_AadharNumber { get; set; }
        public string Vendor_IdentificationMark1 { get; set; }
        public string Vendor_IdentificationMark2 { get; set; }
        public string Vendor_EmergencyContactPerson { get; set; }
        public string Vendor_EmergencyContactNumber { get; set; }
        public string Vendor_NameOnPassBook { get; set; }
        public string Vendor_BankName { get; set; }
        public string Vendor_AccountNumber { get; set; }
        public string Vendor_IFSCCode { get; set; }
        public string Vendor_MICRCode { get; set; }
        public string Vendor_AreasOfActivity { get; set; }
        public string Vendor_Latitude { get; set; }
        public string Vendor_Longitude { get; set; }
      //  public string UserType { get; set; }
        public string Vendor_PassportNumber { get; set; }
        public byte[] Vendor_Photo { get; set; }
        public string Vendor_Nationality { get; set; }
        public string Vendor_MaritalStatus { get; set; }
        public string Vendor_ResidentStatus { get; set; }
        public int EducationID { get; set; }
        public string Vendor_Caste { get; set; }
        public string Vendor_SubCaste { get; set; }
        public string Vendor_Sutram { get; set; }
        public string Vendor_Rishipravara { get; set; }
        public string Vendor_MotherTongue { get; set; }
        public string Vendor_VedicInstitutionName { get; set; }
        public string Vendor_VedicInstitutionLocation { get; set; }
        public string Vendor_VedicCourseName { get; set; }
        public string Vendor_VedicCoursePassedYear { get; set; }
        public string Vendor_OrganisationType { get; set; }
        public string Vendor_OrganisationName { get; set; }
        public int Vendor_BusinessYears { get; set; }
        public decimal Vendor_AnnualIncome { get; set; }
        public string Vendor_IncomeProof { get; set; }
        public string Vendor_IdentityProof { get; set; }
        public string Vendor_AddressProof { get; set; }
        public string Vendor_GSTIN { get; set; }
        public string Vendor_VedaShakha { get; set; }

        public List<VendorCertification> VendorCertifications { get; set; }
        public List<VendorSocialNetwork> VendorSocialNetworks { get; set; }
        public List<VendorRelationShip> VendorRelationShips { get; set; }
        public List<VendorSpecialization> VendorSpecializations { get; set; }
       // public List<VendorEducation> VendorEducations { get; set; }
        public List<VendorLanguage> VendorLanguages { get; set; }
        public List<VendorIndustryType> VendorIndustryTypes { get; set; }
        public List<VendorVirtualPlatform> VendorVirtualPlatforms { get; set; }
        public string FullName { get; set; }
        public string Languages { get; set; }
        public string Specializations { get; set; }
        public string Certifications { get; set; }
        public string IndustryTypes { get; set; }
        public string VirtualPlatforms { get; set; }
        public string SocialNetworks { get; set; }

        public string CountryName { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }

    }
    public class VendorCertification
    {
        public int VendorCertificationID { get; set; }
        public int VendorID { get; set; }
        public int CertificationID { get; set; }
        public bool IsChecked { get; set; }
        //public DateTime ModifiedDate { get; set; }
    }
    public class VendorRelationShip
    {
        public int RelationShipID { get; set; }
        public string RelationShipName { get; set; }
        public int VendorID { get; set; }
 
        public string Name { get; set; }
        public string Gender { get; set; }
    }
    public class VendorSocialNetwork
    {

        public int VendorSocialNetworkID { get; set; }
        public int VendorID { get; set; }
        //public string SocialNetworkName { get; set; }
        public int SocialNetworkID { get; set; }
        public string SocialNetworkURL { get; set; }
    }
    public class VendorSpecialization
    {
        public int SpecializationID { get; set; }
        public int VendorID { get; set; }
        public string SpecializationName { get; set; }
    }
    public class VendorEducation
    {
        public int VendorID { get; set; }
        public int EducationID { get; set; }
        public bool IsChecked { get; set; }
    }
    public class VendorLanguage
    {
        public int VendorID { get; set; }
        public int LanguageID { get; set; }
        public bool IsChecked { get; set; }
    }
    public class VendorIndustryType
    {
        public int VendorID { get; set; }
        public int IndustryTypeID { get; set; }
        public bool IsChecked { get; set; }
    }
    public class VendorVirtualPlatform
    {
        public int VendorID { get; set; }
        public int VirtualPlatformID { get; set; }
        public string VideoCallPlatformLink { get; set; }
        public bool IsChecked { get; set; }
    }
    public class VendorApplicationNumber
    {
        public string ApplicationNumber { get; set; }
        public int Result { get; set; }
    }
    public class VendorPayment
    {
        public int ModeofPayment { get; set; }
        public string ApplicationNumber { get; set; }

        public int PaymentStatus { get; set; }

        public int AmountPaid { get; set; }

        public string InvoiceNo { get; set; }
        public int BookingStatusId { get; set; }
        public int MembershipId { get; set; }
       
    }
    public class VendorOrder
    {
        public string InvoiceNo { get; set; }
        public int Result { get; set; }
       
    }
    public class VendorDataForMap
    {

        public int VendorID { get; set; }
        public string Vendor_FirstName { get; set; }
        public string Vendor_MobileNumber { get; set; }
        public string Vendor_Rishipravara { get; set; }
        public string Vendor_Address1 { get; set; }
        public string Vendor_Latitude { get; set; }
        public string Vendor_Longitude { get; set; }
        public string Vendor_Photo { get; set; }
  
        

    }


}
