using Brahmasmi.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Repository
{
    public interface ITempleServiceRepository
    {
        int AddTempleAdminData(TempleServicesAdminModel templeServicesAdminModel);
        List<Temple> GetTempleData(int TempleId);
        List<TempleType> GetTempleTypes();
        List<ServicesTimings> GetAllServicesTimings(int TempleId);
        List<TemplesWithTypesList> GetTemplesWithTypesList();
    }
}
