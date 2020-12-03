using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IProductRepository
    {
        List<Product> GetAllProducts(int cityID);
        Product GetProduct(int ProductID);
        List<Product> GetAllProducts(ProductParamsModel productParamsModel);

    }
}
