using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IVendorRepository
    {
        int RegisterVendor(Vendor vendor);
        List<Vendor> GetAllVendor();
    }
}
