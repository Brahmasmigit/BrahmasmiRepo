using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class Horoscope
    {
        public int HoroscopeID { get; set; }
        public string HoroscopeSign { get; set; }
    }
    public class HoroscopeDetails
    {
        public int HoroscopeID { get; set; }
        public string Horoscope { get; set; }
        public string HoroscopeDate { get; set; }
        public string HoroscopeSign { get; set; }
    }

}
