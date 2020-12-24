using System;

namespace Brahmasmi.Models
{
    public class Blog
    {
        public int BlogID { get; set; }
        public string BlogTitle { get; set; }
        public byte[] BlogImage { get; set; }
        public string CreatedBy { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Action { get; set; }

    }
}
