using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface ITempleUserBookingRepository
    {
        List<TempleOrders> UserBooking(TempleUserBooking userBooking);
        UserDetails GetUserDetails(int userid);
        //List<TempleOrderDetail> GetTempleOrderDetails(string invoiceno);
        Tuple<List<TempleOrderDetailService>, List<TempleOrderDetailServiceAccommodation>> GetTempleOrderDetails(string invoiceno);
        //List<TempleUserDashboardModel> GetTempleUserDashboard(int userId);
        Tuple<List<TempleOrderDetailService>, List<TempleOrderDetailServiceAccommodation>> GetTempleUserDashboard(int userId);
    }
}
