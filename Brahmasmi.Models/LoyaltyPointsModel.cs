using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class LoyaltyPointsModel
    {
        public int LoyaltyID { get; set; }
        public string LoyaltyType { get; set; }
        public int LoyaltyPoints { get; set; }
        public string  Action { get; set; }
    }
}
