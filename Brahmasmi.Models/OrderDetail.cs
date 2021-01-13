using System;

namespace Brahmasmi.Models
{
    public class OrderDetail
    {
        public string OrderNo { get; set; }
        public string PaymentDate { get; set; }
        public string EmailId { get; set; }
        public int Total { get; set; }
        public string ModeofPayment { get; set; }
        public string ServiceName { get; set; }
        public string ProductName { get; set; }
        public string BookingType { get; set; }
        public string Membership { get; set; }

        public string Name { get; set; }

    }
}
