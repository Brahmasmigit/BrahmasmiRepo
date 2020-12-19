using System;

namespace Brahmasmi.Models
{
    public class TempleOrderDetail
    {
        public string OrderNo { get; set; }
        public string PaymentDateTime { get; set; }
        public string BookingDateTime { get; set; }
        public int TotalAmount { get; set; }
        public string EmailId { get; set; }
        public int ServiceAmount { get; set; }
        public string ModeofPayment { get; set; }
        public string ServiceName { get; set; }
        public int UserId { get; set; }
        public string RoomType { get; set; }
        public int RoomPrice { get; set; }
        public string DarshanType { get; set; }
        public int DarshanPrice { get; set; }
    }
}
