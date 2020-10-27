using System;

namespace Brahmasmi.Models
{
    public class PaymentModel
    {
        public int Amount { get; set; }
        public string Currency { get; set; }
        public string orderId { get; set; }


    }
    public class ConfirmPayment
    {
        public string RazorPaymentId { set; get; }
        public string RazorOrderId { set; get; }
        public string RazorSignature { set; get; }
        public bool IsPaymentSuccess { set; get; }
    }
}
