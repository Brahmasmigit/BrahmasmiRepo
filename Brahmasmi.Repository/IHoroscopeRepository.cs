using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IHoroscopeRepository
    {
        List<Horoscope> GetHoroscopes();
        List<HoroscopeDetails> GetTodayHoroscopeDetails();
        HoroscopeDetails GetHoroscopeDetails(int HoroscopeID);
        int AddHoroscopeDetails(HoroscopeDetails horoscopeDetails);
    }
}
