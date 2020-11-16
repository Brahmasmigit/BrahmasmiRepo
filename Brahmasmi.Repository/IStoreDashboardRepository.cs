using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IStoreDashboardRepository
    {
        List<StoreDashboard> GetStoreOrderDetails(int storeid, string storetype, string calendarType);
        int BookingChangeStatus(BookingChangeStatus booking);
    }
}
