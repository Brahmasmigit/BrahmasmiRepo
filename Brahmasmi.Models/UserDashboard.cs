using System;

namespace Brahmasmi.Models
{
    public class UserDashboard
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

        public int BookingStatusId { get; set; }

        public string TimeIn { get; set; }
        public string TimeOut { get; set; }

        public string MobileNumber { get; set; }

        public string EmailId { get; set; }

        public string PackageName { get; set; }

        public int RatingsId { get; set; }

        public string ReviewComments { get; set; }

        public string CityName { get; set; }

        public string PinCode { get; set; }

        public string BillingAddress { get; set; }

        public string ModeOfPayment { get; set; }

        public int Total { get; set; }

    }
    public class Ratings
    {
        public int BookingId { get; set; }
        public int RatingStars { get; set; }

        public string ReviewComments { get; set; }
    }
}