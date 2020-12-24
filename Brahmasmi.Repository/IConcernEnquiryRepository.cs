using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IConcernEnquiryRepository
    {
        List<ConcernTypes> GetConcernTypes();
        int AddConcernDetails(ConcernEnquiry concernEnquiry);
    }
}
