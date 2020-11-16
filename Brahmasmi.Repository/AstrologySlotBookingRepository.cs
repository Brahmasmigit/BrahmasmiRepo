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
    public class AstrologySlotBookingRepository:IAstrologySlotBookingRepository
    {
        private readonly IDapper dapper;
        public AstrologySlotBookingRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int BookAstrologySlot(AstrologySlotBooking slot)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("Name", slot.Name, DbType.String);
            dbParam.Add("EmailID", slot.EmailID, DbType.String);
            dbParam.Add("MobileNumber", slot.MobileNumber, DbType.String);
            dbParam.Add("CityID", slot.CityID, DbType.Int32);
            dbParam.Add("AstrologyID", slot.AstrologyID, DbType.Int32);
            dbParam.Add("Gender", slot.Gender, DbType.String);
            dbParam.Add("DateOfBirth", slot.DateOfBirth, DbType.Date);
            dbParam.Add("TimeOfBirth", slot.TimeOfBirth, DbType.Time);
            dbParam.Add("PlaceOfBirth", slot.PlaceOfBirth, DbType.String);
            dbParam.Add("LanguageID", slot.LanguageID, DbType.Int32);
            dbParam.Add("Description", slot.Description, DbType.String);
            dbParam.Add("SlotDate", slot.SlotDate, DbType.Date);
            dbParam.Add("SlotTime", slot.SlotTime, DbType.String);
            dbParam.Add("Amount", slot.Amount, DbType.Decimal);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_AstrologySlotBooking]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
