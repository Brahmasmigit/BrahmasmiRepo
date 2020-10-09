using Brahmasmi.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Repository
{
  public  interface IVendorEnquiryRepository
    {
        int VendorEnquiry(VendorEnquiry vendorEnquiry);
       List<VendorEnquiry> GetVendor();
    }
}
