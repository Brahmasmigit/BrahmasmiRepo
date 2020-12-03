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
    public class ProductCategoryRepository:IProductCategoryRepository
    {
        private readonly IDapper dapper;
        public ProductCategoryRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<ProductCategories> GetProductCategories()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<ProductCategories>("[dbo].[SP_Get_ProductCategories]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
