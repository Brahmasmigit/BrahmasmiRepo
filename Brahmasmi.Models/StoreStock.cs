using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class StoreStock
    {
        public int StoreStockID { get; set; }
        public int StoreID { get; set; }
        public int ProductID { get; set; }
        public int ProductQuantity { get; set; }
        public int ProductPrice { get; set; }
        public string ProductName { get; set; }
    }
}
