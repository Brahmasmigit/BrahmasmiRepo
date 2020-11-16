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
    public class StoreStockRepository:IStoreStockRepository
    {
        private readonly IDapper dapper;
        public StoreStockRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int StockEntry(StoreStock stock)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("ProductID", stock.ProductID, DbType.Int32);
            dbParam.Add("StoreID", stock.StoreID, DbType.Int32);
            dbParam.Add("ProductQuantity", stock.ProductQuantity, DbType.Int32);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_StoreStock]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        public List<StoreStock> GetStockDetails(int storeid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("storeid", storeid, DbType.Int32);
            var result = dapper.GetAll<StoreStock>("[dbo].[SP_STOCKDETAILS]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
