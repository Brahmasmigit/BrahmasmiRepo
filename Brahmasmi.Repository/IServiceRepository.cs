using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IServiceRepository
    {
        List<Services> GetServices(int servicetypeid, int cityid);
        List<Services> SearchServices(string search);
    }
}
