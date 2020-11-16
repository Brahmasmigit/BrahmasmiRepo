using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IVirtualSlotBookingRepository
    {
        int VirtualVideoSlot(VirtualSlotBooking virtualSlot);
    }
}
