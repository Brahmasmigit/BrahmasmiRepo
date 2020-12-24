using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface ISpecialserviceRepository
    {
        int AddSpecialservice(SpecialServicesEnquiry Specialservice);
        List<SpecialServices> GetSpecialservices();
        List<SpecialServicesEnquiry> GetAllSpecialServicesEnquiry();

    }
}
