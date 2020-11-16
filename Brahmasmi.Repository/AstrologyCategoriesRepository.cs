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
    public class AstrologyCategoriesRepository:IAstrologyCategoriesRepository
    {
        private readonly IDapper dapper;
        public AstrologyCategoriesRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<AstrologyCategories> GetAstrologyCategories()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<AstrologyCategories>("[dbo].[SP_Get_AstrologyCategories]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public AstrologyCategories GetCategoryAmount(int AstrologyID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("AstrologyID", AstrologyID, DbType.Int32);
            var result = dapper.Get<AstrologyCategories>("[dbo].[SP_Get_AstrologyAmount]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }

    }
}
