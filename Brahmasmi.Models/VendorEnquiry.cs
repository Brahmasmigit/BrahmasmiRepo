using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class VendorEnquiry
    {
        public int EnquiryID { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string EmailID { get; set; }
        public string Description { get; set; }
        public int CityID { get; set; }
        public string CityName { get; set; }
    }
}
