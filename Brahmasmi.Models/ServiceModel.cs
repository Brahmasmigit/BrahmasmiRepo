using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class ServiceModel
    {
        public int ServiceID { get; set; }
        public int ServiceTypeID { get; set; }
        public string ServiceTypeName { get; set; }
        public int CityID { get; set; }
        public string CityName { get; set; }
        public string ServiceName { get; set; }
        public string Servcie_Short_Description { get; set; }
        public string Service_Long_Description { get; set; }
        public byte[] ServiceImage { get; set; }
        public string ServiceImageFile { get; set; }
        public string Action { get; set; }

    }
}
