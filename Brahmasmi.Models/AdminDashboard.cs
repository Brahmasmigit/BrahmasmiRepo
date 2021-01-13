using System;

namespace Brahmasmi.Models
{
    public class AdminDashboard
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string BookingId { get; set; }

        public string BookingType { get; set; }
        public string BookingDate { get; set; }
        public string BookingLocation { get; set; }
        public string BookingTime { get; set; }
        public string Username { get; set; }
        public string Vendorname { get; set; }
        public string BookingStatus { get; set; }

        public int BookingStatusID { get; set; }

        public string BookingAmount { get; set; }
        public string PaymentMode { get; set; }

        public int CityId { get; set; }

        public string CityName { get; set; }

        public string VendorListIds { get; set; }
        public string VendorListNames { get; set; }
        public string Vendor_MobileNumber { get; set; }
        public string Vendor_EmailID { get; set; }
        

    }
    public class VendorBooking
    {
        public int VendorId { get; set; }
        public int BookingId { get; set; }
    }

 }