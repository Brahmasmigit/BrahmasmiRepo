using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
     public class CommunityServices
    {
        public int StateID { get; set; }
        public int CityID { get; set; }
        public int CommunityCategoryID { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string EmailID { get; set; }
        public string Address { get; set; }
        public string Pincode { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string CommunityCategoryName { get; set; }
        public string StateName { get; set; }
        public string CityName { get; set; }
    }
    public class CommunityCategories
    {
        public int CommunityCategoryID { get; set; }
        public string CommunityCategoryName { get; set; }
        //public datetime CreatedDate { get; set; }
        //public bool IsDelete { get; set; }
        //public DateTime ModifiedDate { get; set; }
    }
}
