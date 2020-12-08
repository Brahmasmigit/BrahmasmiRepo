using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class VendorEnquiry
    {
        public int EnquiryId { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }

        public string AltMobileNumber { get; set; }
        public string EmailID { get; set; }

        public string Description { get; set; }
        public int CityID { get; set; }
        public string CityName { get; set; }

        public string StateName { get; set; }
   

        public string CountryName { get; set; }

        public string Gothram { get; set; }

        public string Rishipravara { get; set; }

        public int LanguageId { get; set; }

        public string DOB { get; set; }

        public string Address1 { get; set; }

        public string Address2 { get; set; }

        public int StateID { get; set; }

        public int CountryId { get; set; }

        public string PinCode { get; set; }

        public string Vedashaka { get; set; }

        public string Language { get; set; }

        public int UserType { get; set; }

        public string UserTypeName { get; set; }
        public List<EnquiryLanguages> ListLanguages { get; set; }

    }
    public class EnquiryLanguages
    {
        public int EnquiryId { get; set; }
        public int LanguageID { get; set; }

        public string LanguageName { get; set; }

        public bool IsChecked { get; set; }
    }
}
