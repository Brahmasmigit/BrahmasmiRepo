using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class SpecialServicesEnquiry
    {
        public int SpecialServiceEnquiryID { get; set; }
        public int SpecialServiceID { get; set; }
        public string SpecialServiceName { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string EmailID { get; set; }
        public string Address { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
    public class SpecialServices
    {
        public int SpecialServiceID { get; set; }
        public string SpecialServiceName { get; set; }

    }

    }
