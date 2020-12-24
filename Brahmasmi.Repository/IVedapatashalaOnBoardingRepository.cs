using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IVedapatashalaOnBoardingRepository
    {
        int vedapatashalaonboarding(VedapatashalaOnBoarding vedapatashalaonboarding);
        List<VedapatashalaOnBoarding> GetVedapatashalaOnBoarding();




    }
}
