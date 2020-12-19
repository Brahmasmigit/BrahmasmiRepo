using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{


    public class Product
    {
        public int ProductID { get; set; }
        public int ProductCategoryID { get; set; }
        public string ProductCategoryName { get; set; }
        public string ProductName { get; set; }
        public int CityID { get; set; }
        public string CityName { get; set; }
        public string ProductLongDescription { get; set; }
        public string ProductShortDescription { get; set; }
        public string ProductPrice { get; set; }
        public byte[] ProductImage { get; set; }
        public List<ProductItems> ProductKitItems { get; set; }
        public List<ProductKeyInsights> ProductkeyInsights { get; set; }
        public string IsDelete { get; set; }
        public string Action { get; set; }
    }
    public class ProductItems
    {
        public int ProductID { get; set; }
        public string ItemCategoryID { get; set; }
        public string ItemName { get; set; }
        public string ItemQuantity { get; set; }
    }
    public class ItemCategories
    {
        public string ItemCategoryID { get; set; }
        public string ItemCategoryName { get; set; }
    }
}
