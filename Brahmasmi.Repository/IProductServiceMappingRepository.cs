using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IProductServiceMappingRepository
    {
        int AddProductServiceMapping(ProductServiceMapping productServiceMapping);
    }
}
