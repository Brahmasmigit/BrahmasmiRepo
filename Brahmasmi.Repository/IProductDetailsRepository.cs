﻿using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IProductDetailsRepository
    {
        List<ProductDetails> GetProductDetails(int ProductID);
        List<ProductKeyInsights> GetProductKeyInsights(int ProductID);
    }
}
