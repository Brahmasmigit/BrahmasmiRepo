using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IVendorDashboardRepository
    {
        List<VendorDashboard> GetOngoing(int vendorid, string calendarType);
    }
}
