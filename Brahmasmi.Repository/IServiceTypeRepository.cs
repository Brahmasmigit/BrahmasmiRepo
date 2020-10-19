using System;
using Brahmasmi.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    public interface IServiceTypeRepository
    {
        int AddUpdateServiceType(IFormFile imageFile, ServiceType serviceType);
        int DeleteServiceType(ServiceType serviceType);
        List<ServiceType> GetAllServiceTypes();

        List<ServiceType> GetServiceTypes(int cityid);
    }
}
