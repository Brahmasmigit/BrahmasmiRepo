using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IBookingChangeStatusRepository
    {
        int BookingChangeStatus(BookingChangeStatus booking);
    }
}
