using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface ICouponRepository
    {
        int AddUpdateCoupon(Coupon coupon);
        List<Coupon> GetCouponDetails();
        int DeleteCoupon(Coupon coupon);


    }
}
