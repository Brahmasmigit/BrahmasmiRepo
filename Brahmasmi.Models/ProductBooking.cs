using System;

namespace Brahmasmi.Models
{
    public class ProductBooking
    {
        public int UserId { get; set; }

        public string ProductName { get; set; }
        public int ProductCost { get; set; }

        public string ProductPrice { get; set; }

        public int StoreId { get; set; }
        public string BookingType { get; set; }
        public int ProductId { get; set; }
        public int BookingStatusId { get; set; }
        public string BookingLocation { get; set; }
 
        public string ReviewComments { get; set; }
        public int CityId { get; set; }

        public int NewCItyId { get; set; }

        public string UserName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public string IsDifferentLocation { get; set; }
        public string PinCode { get; set; }

        public string NewPinCode { get; set; }
        public string Address { get; set; }
        public string NewAddress { get; set; }

        public string OrderNO { get; set; }
        public string InvoiceNo { get; set; }
        public int PaymentMode { get; set; }
        public int PaymentStatus { get; set; }
        public int Total { get; set; }

        public int Quantity { get; set; }
    }
    public class ProductOrders
    {
        public string OrderNO { get; set; }

        public string InvoiceNo { get; set; }
        public int Result { get; set; }
    }
}

