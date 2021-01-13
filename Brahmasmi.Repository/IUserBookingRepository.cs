using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IUserBookingRepository
    {
        List<Orders> UserBooking(List<UserBooking> userBooking);
        UserDetails GetUserDetails(int userid);
        string ChangeResponseStatus(string response);
    }
}
