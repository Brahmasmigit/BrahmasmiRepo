using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using Microsoft.AspNetCore.Http;

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
            var result = dapper.GetAll<Product>("[dbo].[SP_Get_AllProductsByCity]"
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
        public List<Product> GetAllProducts(ProductParamsModel productParamsModel)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("CityID", productParamsModel.CityID, DbType.Int32);
            dbParam.Add("ProductcategoryID", productParamsModel.ProductCategoryID, DbType.Int32);
            var result = dapper.GetAll<Product>("[dbo].[SP_Get_AllProducts]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int AddProduct(IFormFile imageFile, Product product)
        {
            var dbParam = new DynamicParameters();
            // var uploadFile = Request.Form.Files[0];
            var uploadFile = imageFile;
            long length = uploadFile.Length;
            byte[] bytes = new byte[length];
            var reader = uploadFile.OpenReadStream();
            reader.ReadAsync(bytes, 0, Convert.ToInt32(length));
            reader.Close();
            dbParam.Add("ProductName", product.ProductName, DbType.String);
            dbParam.Add("ProductPrice", product.ProductPrice, DbType.Decimal);
            dbParam.Add("ProductShortDescription", product.ProductShortDescription, DbType.String);
            dbParam.Add("ProductLongDescription", product.ProductLongDescription, DbType.String);
            dbParam.Add("ProductImage", bytes, DbType.Binary);
            dbParam.Add("CityID", product.CityID, DbType.Int32);
            dbParam.Add("Action", product.Action, DbType.String);
            dbParam.Add("ProductCategoryID", product.ProductCategoryID, DbType.Int32);
            if (!(product.ProductKitItems == null))
            {
                DataTable dtProductItems = new DataTable();
                dtProductItems = GetProductItem(product.ProductKitItems);
                dbParam.Add("ProductKitItems", dtProductItems.AsTableValuedParameter("dbo.TT_ProductItems"));
            }
            //if (product.ProductkeyInsights == null)
            //{
            //    dbParam.Add("ProductkeyInsights", null);
            //}
            if (!(product.ProductkeyInsights == null))
            {
                DataTable dtProductKeyInsights = new DataTable();
                dtProductKeyInsights = GetProductKeyInsights(product.ProductkeyInsights);
                dbParam.Add("ProductkeyInsights", dtProductKeyInsights.AsTableValuedParameter("dbo.TT_ProductKeyInsights"));
            }
    

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_Product]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public DataTable GetProductItem(List<ProductItems> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("ProductID", typeof(int));
            table.Columns.Add("ItemCategoryID", typeof(string));
            table.Columns.Add("ItemName", typeof(string));
            table.Columns.Add("ItemQuantity", typeof(string));

            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    row["ProductID"] = lstdetails[i].ProductID;
                    if(lstdetails[i].ItemCategoryID!="" || lstdetails[i].ItemCategoryID!=null)
                    {
                        row["ItemCategoryID"] = Convert.ToInt32(lstdetails[i].ItemCategoryID);
                    }
                  
                    row["ItemName"] = lstdetails[i].ItemName;
                    row["ItemQuantity"] = lstdetails[i].ItemQuantity;
                    table.Rows.Add(row);
                }
            }
            return table;
        }
        public DataTable GetProductKeyInsights(List<ProductKeyInsights> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("ProductKeyInsightsName", typeof(string));
            table.Columns.Add("ProductID", typeof(int));

            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    row["ProductKeyInsightsName"] = lstdetails[i].ProductKeyInsightsName;
                    row["ProductID"] = lstdetails[i].ProductID;
                    table.Rows.Add(row);
                }
            }
            return table;
        }
        public List<ItemCategories> GetAllItemCategories()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<ItemCategories>("[dbo].[SP_Get_AllItemCategories]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<Product> GetProducts()
        {
            var dbParam = new DynamicParameters();
      
            var result = dapper.GetAll<Product>("[dbo].[SP_Get_Products]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}


