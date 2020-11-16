using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IBookingChangeStatusRepository
    {
        int BookingChangeStatus(BookingChangeStatus booking);

        int UpdateVendor(VendorBooking booking);
        int ProductBookingChangeStatus(BookingChangeStatus booking);

        int UpdateStore(StoreBooking booking);
    }
}
