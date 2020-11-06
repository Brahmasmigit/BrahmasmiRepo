using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class Store
    {
        public int StoreID { get; set; }
        public string StoreName { get; set; }
        public string OwnerName { get; set; }
        public string MobileNumber { get; set; }
        public int CityID { get; set; }
        public string  EmailID { get; set; }
        public string Address { get; set; }
        public string PinCode { get; set; }
        public string Status { get; set; }
        public string CreatedBy { get; set; }
        public string IsDelete { get; set; }
    }
}
