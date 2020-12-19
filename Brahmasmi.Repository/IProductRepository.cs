using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    public interface IProductRepository
    {
        List<Product> GetAllProducts(int cityID);
        List<Product> GetProducts();
        Product GetProduct(int ProductID);
        List<Product> GetAllProducts(ProductParamsModel productParamsModel);
        int AddProduct(IFormFile imageFile, Product product);
        List<ItemCategories> GetAllItemCategories();



    }
}
