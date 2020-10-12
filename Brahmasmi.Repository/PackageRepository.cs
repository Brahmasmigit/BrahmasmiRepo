using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class PackageRepository : IPackageRepository
    {
        private readonly IDapper dapper;
        public PackageRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<Package> GetUserPackages(int serviceid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("serviceid", serviceid, DbType.Int32);
            List<Package> result = dapper.GetAll<Package>("[dbo].[SP_USERPACKAGES]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            
            if (result.Count() > 0)
            {
              var lstpkg = result.GroupBy(y => y.PackageName).ToList();
                if (lstpkg.Count() > 0)
                {
                    for (int i = 0; i < lstpkg.Count(); i++)
                    {
                        result[i].lstItems = new List<PoojaItems>();
                        result[i].lstProcedures = new List<string>();
                        result[i].PackageName = lstpkg[i].Key;
                       
                        foreach (var item in lstpkg[i])
                        {
                            result[i].Price = item.Price;
                            result[i].lstItems.Add(new PoojaItems()
                            {
                                ItemName = item.ItemName,
                                ItemPrice = item.ItemPrice
                            });
                            result[i].lstProcedures.Add(item.ProcedureName);
                        }
                        result[i].lstItems = result[i].lstItems.GroupBy(x => x.ItemName).Select(z => z.First()).ToList();
                        result[i].lstProcedures = result[i].lstProcedures.GroupBy(x => x).Select(z => z.First()).ToList();

                    }
                    result = result.Take(lstpkg.Count()).ToList();
                }
                
            }
            return result;

        }
    }
}
