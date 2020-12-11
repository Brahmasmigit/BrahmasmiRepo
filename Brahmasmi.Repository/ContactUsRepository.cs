using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using System.Reflection;


namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class ContactUsRepository:IContactUsRepository
    {
        private readonly IDapper dapper;
        public ContactUsRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int Contact(ContactUs contact)
{
    var dbParam = new DynamicParameters();
        dbParam.Add("FullName", contact.FullName, DbType.String);
    dbParam.Add("MobileNumber", contact.MobileNumber, DbType.String);
    dbParam.Add("EmailID", contact.EmailID, DbType.String);
    dbParam.Add("Message", contact.Message, DbType.String);


    dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
    var result = dapper.Execute("[dbo].[SP_Insert_ContactUs]"
         , dbParam,
         commandType: CommandType.StoredProcedure);
    return result;
}

}
}

