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
    public class ProductDetailsRepository:IProductDetailsRepository
    {
        private readonly IDapper dapper;
        public ProductDetailsRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<ProductDetails> GetProductDetails(int ProductID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("ProductID", ProductID, DbType.Int32);
            var result = dapper.GetAll<ProductDetails>("[dbo].[SP_Get_ProductDetails]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
