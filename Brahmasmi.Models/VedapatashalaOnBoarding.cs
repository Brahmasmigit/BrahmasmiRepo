using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class VedapatashalaOnBoarding
    {
        public int StateID { get; set; }
        public int CityID { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }
        public int VedapatashalaID { get; set; }
        public string NameOfVedapatashala { get; set; }     
        public string MobileNumber { get; set; }
        public string EmailIDOfVedapatashala { get; set; }
        public string AddressOfVedapatashala { get; set; }
        public string PinCode { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public int NumberOfStudents { get; set; }
        public string AnyHelpNeeded { get; set; }
        public string Certifications { get; set; }
        public List<VedapatashalaCertifications> VedapatashalaCertification { get; set; }


    }
    public class VedapatashalaCertifications
    {
        public int CertificationID { get; set; }
        public int VedapatashalaID { get; set; }
        public bool IsChecked { get; set; }
        
    }
}
