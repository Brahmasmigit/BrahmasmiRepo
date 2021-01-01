using System;
using Brahmasmi.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    public interface IServiceRepository
    {
        List<Services> GetServices(int servicetypeid, int cityid);
        List<Services> SearchServices(string search, int cityId);
        int AddService(IFormFile imageFile, ServiceModel service);
        List<ServiceModel> GetAllServices();
        List<City> GetServiceTypeCity(int ServiceTypeID);
        int DeleteService(ServiceModel serviceModel);
        List<Services> GetAllServiceByCity(int CityID);
    }
}
