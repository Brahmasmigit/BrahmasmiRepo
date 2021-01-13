using System;

namespace Brahmasmi.Models
{
    public class BookingChangeStatus
    {
        public int BookingId { get; set; }
        public int BookingStatusId { get; set; }
        public int ServiceId { get; set; }
        public string VendorIdList { get; set; }
        public string  Vendor_MobileNumber { get; set; }
        public string Vendor_EmailID { get; set; }
        public string Vendor_Name { get; set; }

    }
}

