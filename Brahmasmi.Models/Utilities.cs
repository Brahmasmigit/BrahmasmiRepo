using System;

namespace Brahmasmi.Models
{
    public class Utilities
    {
     

    }
    public class City
    {
        public int CityID { get; set; }
        public string CityName { get; set; }
        public int StateID { get; set; }
        public DateTime ModifiedDate { get; set; }

    }
    public class State
    {
        public int StateID { get; set; }
        public string StateName { get; set; }
    }
    public class Title
    {
        public int TitleID { get; set; }
        public string TitleName { get; set; }
    }
    public class SocialNetwork
    {
        public int SocialNetworkID { get; set; }
        public string SocialNetworkName { get; set; }
    }
    public class Certifications
    {
        public int CertificationID { get; set; }
        public string CertificationName { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
    public class Patient
    {
        public int PatientID { get; set; }
        public string PatientName { get; set; }
        public string PatientIllness { get; set; }

    }
    public class AdminVendor
    {
        public int VendorId { get; set; }
        public string VendorName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public string VendorAddress { get; set; }

        public string CityName { get; set; }
    }
    public class Meeting
    {
        public string MeetingId { get; set; }
        public string MeetingPassword { get; set; }
        public string Signature { get; set; }
    }
}
