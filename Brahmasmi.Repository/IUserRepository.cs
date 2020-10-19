using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;

namespace Brahmasmi.Repository
{
    public interface IUserRepository
    {
       
        User Login(UserLogin userLogin);
        int UpdateUser(User user);

        User GetUser(int userid);
    }
}
