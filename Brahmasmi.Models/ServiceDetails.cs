using System;
using System.Collections.Generic;

namespace Brahmasmi.Models
{
    public class ServiceDetails
    {
        public int ServiceId { get; set; }

        public int VendorId { get; set; }

        public int ServiceTypeId { get; set; }
        public string ServiceName { get; set; }

        public string ShortDescription { get; set; }

        public string LongDescription { get; set; }

        public string Insight { get; set; }

        public List<string> ListInsight { get; set; }

    }
}
