using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class ConcernEnquiry
    {
        public int ConcernsEnquiryID { get; set; }
        public int ConcernID { get; set; }
        public decimal RequestedAmount { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string EmailID { get; set; }
        public string Address { get; set; }
    }
    public class ConcernTypes
    {
        public int ConcernID { get; set; }
        public string ConcernType { get; set; }
    }

  }
