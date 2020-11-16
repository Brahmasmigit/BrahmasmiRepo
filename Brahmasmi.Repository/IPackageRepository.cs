using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IPackageRepository
    {
        List<Package> GetUserPackages(int serviceid);

        List<Package> GetUserPackageList(int ServiceID);

        Package GetPackagePrice(ServicePackage service);
    }
}
