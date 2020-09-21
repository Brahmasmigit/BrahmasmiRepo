using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IAdminDashboardRepository
    {
        List<AdminDashboard> GetBookingData(int statusid, string bookingdate);
    }
}
