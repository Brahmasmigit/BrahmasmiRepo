using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class ProductRepository:IProductRepository
    {
        private readonly IDapper dapper;
        public ProductRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<Product> GetAllProducts(int cityID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("cityID", cityID, DbType.Int32);
            var result = dapper.GetAll<Product>("[dbo].[SP_Get_AllProducts]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public Product GetProduct(int productID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("ProductID", productID, DbType.Int32);
            var result = dapper.Get<Product>("[dbo].[SP_Get_Product]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
