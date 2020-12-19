using System;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface ILoginRepository
    {
        User UserLogin(UserLogin userLogin);
        Vendor VendorLogin(UserLogin vendor);

        Store StoreExist(UserLogin store);
    }
}
