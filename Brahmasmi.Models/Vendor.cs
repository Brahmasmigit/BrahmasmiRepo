using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class Vendor
    {
        public int VendorID { get; set; }
        public int UserTypeID { get; set; }
        public int TitleID { get; set; }
        public string Vendor_FirstName { get; set; }
        public string Vendor_MiddleName { get; set; }
        public string Vendor_LastName { get; set; }
        public string Vendor_NickName { get; set; }
        public string Vendor_Gothram { get; set; }
        public string Vendor_FatherName { get; set; }
        public string Vendor_Gender { get; set; }
        public string Vendor_Occupation { get; set; }
        public int Vendor_Height { get; set; }
        public int Vendor_Weight { get; set; }
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
        public byte[] Photo { get; set; }
        public List<VendorCertification> VendorCertifications { get; set; }
        public List<VendorSocialNetwork> VendorSocialNetworks { get; set; }
        public List<VendorRelationShip> VendorRelationShips { get; set; }
        public List<VendorSpecialization> VendorSpecializations { get; set; }

    }
    public class VendorCertification
    {
        public int VendorID { get; set; }
        public int CertificationID { get; set; }
        public bool IsChecked { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
    public class VendorRelationShip
    {

        public string RelationShipName { get; set; }
        public int VendorID { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
    }
    public class VendorSocialNetwork
    {
        public int VendorID { get; set; }
        public string SocialNetworkName { get; set; }
        public int SocialNetworkID { get; set; }
        public string SocialNetworkURL { get; set; }
    }
    public class VendorSpecialization
    {
        public int VendorID { get; set; }
        public string SpecializationName { get; set; }
    }
}
