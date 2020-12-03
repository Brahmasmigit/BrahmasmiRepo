using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface ILoyaltyPointsRepository
    {
        int AddUpdateLoyaltyPoints(LoyaltyPointsModel loyaltyPoints);
        List<LoyaltyPointsModel> GetLoyaltyPoints();
        int DeleteLoyaltyPoints(LoyaltyPointsModel loyaltyPoints);
    }
}
