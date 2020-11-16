using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IStoreStockRepository
    {
        int StockEntry(StoreStock storeStock);
        List<StoreStock> GetStockDetails(int storeid);
    }
}
