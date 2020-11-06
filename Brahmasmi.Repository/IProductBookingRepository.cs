using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IProductBookingRepository
    {
        List<ProductOrders> ProductBooking(List<ProductBooking> productBooking);
    }
}
