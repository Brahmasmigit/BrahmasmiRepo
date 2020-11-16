using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IAdminProductRepository
    {
        List<StoreDashboard> GetBookingData(int statusid, string bookingdate);
    }
}
