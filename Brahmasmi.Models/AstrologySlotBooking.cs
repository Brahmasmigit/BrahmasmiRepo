using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class AstrologySlotBooking
    {
        public string Name { get; set; }
        public string EmailID { get; set; }
        public string MobileNumber { get; set; }
        public int CityID { get; set; }
        public int AstrologyID { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string TimeOfBirth { get; set; }
        public int LanguageID { get; set; }
        public string Description { get; set; }
        public string SlotDate { get; set; }
        public string SlotTime { get; set; }
        public decimal Amount { get; set; }
        public string PlaceOfBirth { get; set; }

    }
}
