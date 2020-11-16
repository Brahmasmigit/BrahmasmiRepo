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
    public class VirtualSlotBookingRepository:IVirtualSlotBookingRepository
    {
        private readonly IDapper dapper;
        public VirtualSlotBookingRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public int VirtualVideoSlot(VirtualSlotBooking slot)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("Name", slot.Name, DbType.String);
            dbParam.Add("EmailID", slot.EmailID, DbType.String);
            dbParam.Add("MobileNumber", slot.MobileNumber, DbType.String);
            dbParam.Add("CityID", slot.CityID, DbType.Int32);
            dbParam.Add("ServiceType", slot.ServiceType, DbType.String);
            dbParam.Add("ServiceID", slot.ServiceID, DbType.Int32);
            if(slot.ServiceType=="Pooja")
            {
                dbParam.Add("PackageId", slot.PackageId, DbType.Int32);
            }
            else
            if(slot.ServiceType == "Astrology")
            {
                dbParam.Add("PackageId",null, DbType.Int32);
            }
            dbParam.Add("Amount", slot.Amount, DbType.Decimal);
            dbParam.Add("VirtualVideoCategoryID", slot.VirtualVideoCategoryID, DbType.Int32);
            dbParam.Add("LanguageID", slot.LanguageID, DbType.Int32);
            dbParam.Add("Description", slot.Description, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Insert_VirtualSlotBooking]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
