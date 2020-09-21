using System;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IRegisterRepository
    {
        int RegisterUser(Register register);
    }
}
