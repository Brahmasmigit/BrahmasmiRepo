using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class VirtualSlotBooking
    {
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string EmailID { get; set; }
        public int CityID { get; set; }
        public string ServiceType { get; set; }
        public int ServiceID { get; set; }
        public int PackageId { get; set; }
        public decimal Amount { get; set; }
        public int VirtualVideoCategoryID { get; set; }
        public int LanguageID { get; set; }
        public string Description { get; set; }
    }
}
