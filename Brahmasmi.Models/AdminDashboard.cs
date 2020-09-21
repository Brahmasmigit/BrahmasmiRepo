using System;

namespace Brahmasmi.Models
{
    public class AdminDashboard
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string BookingId { get; set; }
        public string BookingDate { get; set; }
        public string BookingLocation { get; set; }
        public string BookingTime { get; set; }
        public string Username { get; set; }
        public string Vendorname { get; set; }
        public string BookingStatus { get; set; }

        public int BookingStatusID { get; set; }

        

    }
}