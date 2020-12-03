using System;
using Brahmasmi.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    public interface IVendorSearchRepository
    {
        List<VendorSearch> SearchVendors(int cityid,string region);
    }
}
