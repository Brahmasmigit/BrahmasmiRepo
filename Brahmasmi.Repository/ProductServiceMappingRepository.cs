using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using System.Reflection;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public  class ProductServiceMappingRepository:IProductServiceMappingRepository
    {
        private readonly IDapper dapper;
        public ProductServiceMappingRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int AddProductServiceMapping(ProductServiceMapping product)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("ServiceID", product.ServiceID, DbType.Int32);
            dbParam.Add("ProductID", product.ProductID, DbType.Int32);
            dbParam.Add("PackageID", product.PackageID, DbType.Int32);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_ProductServiceMapping]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
