using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class User
    {
        public int UserID { get; set; }
        public int UserTypeID { get; set; }
        public int CityID { get; set; }
        public int CountryID { get; set; }
        public int LanguageID { get; set; }
        public int StateID { get; set; }
        public string User_MobileNumber { get; set; }
        public string User_Name { get; set; }
        public string User_EmailID { get; set; }
        public string user_Address1 { get; set; }
        public string User_Address2 { get; set; }
        public string User_Address3 { get; set; }
        public string User_PinCode { get; set; }
        public string User_Latitude { get; set; }
        public string User_Longitude { get; set; }
        public string User_Status { get; set; }
        public DateTime ModifiedDate { get; set; }



    }
}
