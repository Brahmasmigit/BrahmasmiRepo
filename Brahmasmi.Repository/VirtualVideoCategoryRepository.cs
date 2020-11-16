using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;

namespace Brahmasmi.Repository
{
    public class VirtualVideoCategoryRepository:IVirtualVideoCategoryRepository
    {
        private readonly IDapper dapper;
        public VirtualVideoCategoryRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<VirtualVideoCategory> GetVirtualVideoCategory()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<VirtualVideoCategory>("[dbo].[SP_Get_VirtualVideoCategories]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
  

    }
}
