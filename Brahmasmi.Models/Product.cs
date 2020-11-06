using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductLongDescription { get; set; }
        public string ProductShortDescription { get; set; }
        public string ProductPrice{ get; set; }
        public byte[] ProductImage { get; set; }
        public string IsDelete { get; set; }
    }
}
