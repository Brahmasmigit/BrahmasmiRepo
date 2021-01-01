using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class VendorDetails
    {
        public int VendorID { get; set; }
        public string FullName { get; set; }
        public string Vendor_EmailID { get; set; }
        public string Vendor_MobileNumber { get; set; }
        public string CityName { get; set; }
        public string UserTypeName { get; set; }
        public string ModeOfPayment { get; set; }
        public string amountpaid { get; set; }
        public string membership { get; set; }
        public string BookingStatusName { get; set; }
        public string PaymentStatusName { get; set; }
        public string Vendor_Status { get; set; }

    }
}
