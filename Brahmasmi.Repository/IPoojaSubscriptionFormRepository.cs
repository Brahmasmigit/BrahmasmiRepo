using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IPoojaSubscriptionFormRepository
    {
        int AddPoojaSubscriptionForm(PoojaSubscriptionForm PoojaSubscription);
        List<SubscriptionCategory> GetSubscriptionForm();
        List<PoojaServices> GetPoojaServices();

    }
}
