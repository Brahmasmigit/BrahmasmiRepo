using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IPackageRepository
    {
        List<Package> GetUserPackages(int serviceid);
    }
}
