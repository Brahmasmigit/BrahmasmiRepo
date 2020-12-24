using Brahmasmi.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Repository
{
    public interface ITempleServiceRepository
    {
        int AddTempleAdminData(IFormFile imageFile, TempleServicesAdminModel templeServicesAdminModel);
        List<Temple> GetTempleData(int TempleId);
        List<TempleType> GetTempleTypes();
        List<ServicesTimings> GetAllServicesTimings(int TempleId);
        List<AccommodationTimingsModel> GetAllAccommodationTimings(int TempleId);
        List<TemplesWithTypesList> GetTemplesWithTypesList();
        List<TempleServiceUserRequest> GetTempleServiceUserRequest();
        int DeleteTemple(TempleServicesAdminModel data);
    }
}
