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
    [EnableCors("CorsPolicy")]
    public class HoroscopeRepository:IHoroscopeRepository
    {
        private readonly IDapper dapper;
        public HoroscopeRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<Horoscope> GetHoroscopes()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<Horoscope>("[dbo].[SP_Get_AllHoroscopeSign]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<HoroscopeDetails> GetTodayHoroscopeDetails()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<HoroscopeDetails>("[dbo].[SP_Get_TodayHoroscopeDetails]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;

        }
        public HoroscopeDetails GetHoroscopeDetails(int HoroscopeID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("HoroscopeID", HoroscopeID, DbType.Int32);
            var result = dapper.Get<HoroscopeDetails>("[dbo].[SP_Get_HoroscopeDetails]", dbParam
                 , commandType: CommandType.StoredProcedure);
            return result;

        }
        public int AddHoroscopeDetails(HoroscopeDetails horoscopeDetails)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("HoroscopeID", horoscopeDetails.HoroscopeID, DbType.Int32);
            dbParam.Add("Horoscope", horoscopeDetails.Horoscope, DbType.String);
            dbParam.Add("HoroscopeDate", horoscopeDetails.HoroscopeDate, DbType.DateTime);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_HoroscopeDetails]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }

    }
}
