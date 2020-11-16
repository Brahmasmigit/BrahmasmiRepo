using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class StoreDashboard
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string BookingId { get; set; }

        public int StoreQuantity { get; set; }
        public int StoreId { get; set; }
        public string BookingDate { get; set; }
        public string BookingLocation { get; set; }
        public string BookingTime { get; set; }
        public string UserName { get; set; }

        public string StoreName { get; set; }

        public string OwnerName { get; set; }

        public string StoreMobileNumber { get; set; }

        public string StoreEmailId { get; set; }

        public string StoreAddress { get; set; }

        public string StorePinCode { get; set; }

        public string StoreCity { get; set; }

        

        public string BookingStatus { get; set; }

        public int BookingStatusId { get; set; }

        public string MobileNumber { get; set; }

        public string EmailId { get; set; }
        public int RatingsId { get; set; }

        public string ReviewComments { get; set; }

        public string CityName { get; set; }

        public string PinCode { get; set; }

        public string BillingAddress { get; set; }

        public string ModeOfPayment { get; set; }

        public string OrderNo { get; set; }

        public int Total { get; set; }

        public int Quantity { get; set; }
    }
    public class StoreBooking
    {
        public int StoreId { get; set; }
        public int BookingId { get; set; }
    }
}
