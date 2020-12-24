using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace Brahmasmi.Service
{
        public interface IDapper : IDisposable
        {
            DbConnection GetDbconnection();
            T Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
            List<T> GetAll<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        //Tuple<List<T1>, List<T2>> GetMultipleResult<T1,T2>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        Tuple<T, List<T1>, List<T2>, List<T3>, List<T4>> GetMultipleResult<T, T1, T2, T3, T4>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        Tuple<List<T1>, List<T2>> GetMultipleResult1<T1, T2>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        int Execute(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        }
}
