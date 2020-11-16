using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IAstrologyCategoriesRepository
    {
        List<AstrologyCategories> GetAstrologyCategories();
        AstrologyCategories GetCategoryAmount(int AstrologyID);
    }
}
