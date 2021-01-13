using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    public interface IVendorRepository
    {
        List<VendorApplicationNumber> RegisterVendor(Vendor vendor);
        int UpdateVendor(Vendor vendor);
        List<VendorDataForMap> GetAllVendor();

        List<VendorOrder> VendorPayment(VendorPayment vendorPayment);
        Tuple<Vendor, List<VendorCertification>, List<VendorSocialNetwork>, List<VendorRelationShip>, List<VendorSpecialization>> GetVendorDetails(int VendorID);
        int UploadPhoto(IFormFile imageFile, Vendor vendor);
        Vendor GetVendorProfile(int VendorID);
        List<VendorDetails> GetVendorDetail();
        Vendor GetVendorPreview(int VendorID);


    }
}
