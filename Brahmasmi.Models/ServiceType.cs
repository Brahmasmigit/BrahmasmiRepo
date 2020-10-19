using System;

namespace Brahmasmi.Models
{
    public class ServiceType
    {
        public int ServiceTypeID { get; set; }
        public string ServiceTypeName { get; set; }
        public int CityID { get; set; }
        public string CityName { get; set; }
        public byte[] ServiceTypeImage { get; set; }
        public string Action { get; set; }

    }
}
