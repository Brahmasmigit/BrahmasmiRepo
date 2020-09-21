using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IServiceTypeRepository
    {
        List<ServiceType> GetServiceTypes(int cityid);
    }
}
