using System;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface ILoginRepository
    {
        User UserLogin(string mobilenumber);
        Vendor VendorLogin(string mobilenumber);

        Store StoreExist(string mobilenumber);
    }
}
