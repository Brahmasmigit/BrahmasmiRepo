using System;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface ILoginRepository
    {
        Login Login(string mobileNumber);
    }
}
