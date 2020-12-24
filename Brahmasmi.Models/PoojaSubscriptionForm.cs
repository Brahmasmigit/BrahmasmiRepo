using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class PoojaSubscriptionForm
    {
        public int SubscriptionCategoryID { get; set; }
        public int PoojaServicesID { get; set; }
        public int PoojaSubscriptionFormID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string MobileNumber { get; set; }
        public string EmailID { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public List<PoojaSubscriptionServices> PoojaService { get; set; }
      
    }
    public class SubscriptionCategory
    {
        public int SubscriptionCategoryID { get; set; }
        public string SubscriptionCategoryName { get; set; }

    }
    public class PoojaServices
    {
   
        public int PoojaServicesID { get; set; }
        public string PoojaServicesName { get; set; }
    
    }
    public class PoojaSubscriptionServices
    {
        public int PoojaSubscriptionFormID { get; set; }
        public int PoojaServicesID { get; set; }
        public bool IsChecked { get; set; }
    }

}
