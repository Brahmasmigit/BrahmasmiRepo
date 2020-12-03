using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class Coupon
    {
        public int CouponID { get; set; }
        public string CouponCode { get; set; }
        public string  CouponDescription { get; set; }
        public int CouponDiscount { get; set; }
        public string CouponExpiryDate { get; set; }
        public string Action { get; set; }
    }
}
