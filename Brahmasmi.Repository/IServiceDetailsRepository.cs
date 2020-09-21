using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IServiceDetailsRepository
    {
        ServiceDetails GetServiceDetails(int serviceid);
    }
}
