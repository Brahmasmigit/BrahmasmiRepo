using System;
using System.Collections.Generic;

namespace Brahmasmi.Models
{
    public class Package
    {
        public int ServiceId { get; set; }
        public int PackageId { get; set; }

        public int Price { get; set; }
        public int ProductID { get; set; }
        public int ItemPrice { get; set; }

        public string ItemName { get; set; }
        public string PackageName { get; set; }

        public string ServiceName { get; set; }
        public string CityName { get; set; }

        public string ProcedureName { get; set; }
        public List<PoojaItems> lstItems { get; set; }
        public List<string> lstProcedures { get; set; }

       
    }
    public class PoojaItems
    {
        public string ItemName { get; set; }
        public int ItemPrice { get; set; }
    }
}
