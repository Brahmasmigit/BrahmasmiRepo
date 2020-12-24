using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface ICommunityServicesRepository
    {
        int RegisterCommunityServices(CommunityServices slot);
        List<CommunityCategories> GetCommunityCategories();
        List<CommunityServices> GetAllCommunityCategories();

    }
}
