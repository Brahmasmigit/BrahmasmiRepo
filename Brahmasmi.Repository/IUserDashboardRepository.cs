using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IUserDashboardRepository
    {
        List<UserDashboard> GetOngoing(int userid, string calendarType);
        int UserRatings(Ratings ratings);
    }
}
