using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IVendorRepository
    {
        int RegisterVendor(Vendor vendor);
        int UpdateVendor(Vendor vendor);
        List<Vendor> GetAllVendor();

        Tuple<Vendor, List<VendorCertification>, List<VendorSocialNetwork>, List<VendorRelationShip>, List<VendorSpecialization>> GetVendorDetails(int VendorID);
    }
}
