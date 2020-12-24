using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class TempleServiceRepository : ITempleServiceRepository
    {
        private readonly IDapper dapper;
        
        public TempleServiceRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        
        public int AddTempleAdminData(IFormFile imageFile, TempleServicesAdminModel adminModel)
        {
            var dbParam = new DynamicParameters();

            var uploadFile = imageFile;
            long length = uploadFile.Length;
            byte[] bytes = new byte[length];
            var reader = uploadFile.OpenReadStream();
            reader.ReadAsync(bytes, 0, Convert.ToInt32(length));
            reader.Close();

            dbParam.Add("TempleTypeId", adminModel.TempleTypeId, DbType.Int32);
            dbParam.Add("TempleId", adminModel.TempleId, DbType.Int32);
            dbParam.Add("TempleName", adminModel.TempleName, DbType.String);
            dbParam.Add("AboutTemple", adminModel.AboutTemple, DbType.String);
            dbParam.Add("TempleDescription", adminModel.TempleDescription, DbType.String);
            dbParam.Add("TempleTransport", adminModel.TempleTransport, DbType.String);
            dbParam.Add("StateId", adminModel.StateId, DbType.Int32);
            dbParam.Add("CityId", adminModel.CityId, DbType.Int32);
            dbParam.Add("CustomerReviews", adminModel.CustomerReviews, DbType.String);
            dbParam.Add("Action", adminModel.Action, DbType.String);
            dbParam.Add("TempleImage", bytes, DbType.Binary);
            dbParam.Add("TempleImageFileName", adminModel.TempleImageFileName, DbType.String);

            if (!(adminModel.ServicesTimings == null))
            {
                DataTable serviceTimings = GetServiceTimings(adminModel.ServicesTimings);
                dbParam.Add("ServiceTimings", serviceTimings.AsTableValuedParameter("dbo.TT_ServiceTimings"));
            }

            if (!(adminModel.AccommodationTimings == null))
            {
                DataTable accommodationTimings = GetAccommodationTimings(adminModel.AccommodationTimings);
                dbParam.Add("AccommodationTimings", accommodationTimings.AsTableValuedParameter("dbo.TT_AccommodationTimings"));
            }

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Temple_Transaction]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }

        public DataTable GetServiceTimings(List<ServiceTimingsModel> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("TempleId", typeof(int));
            table.Columns.Add("ServiceId", typeof(int));
            table.Columns.Add("ServiceName", typeof(string));
            table.Columns.Add("ServiceTimings", typeof(string));
            table.Columns.Add("ServicePrice", typeof(double));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    row["TempleId"] = lstdetails[i].TempleId;
                    row["ServiceId"] = lstdetails[i].ServiceId;
                    row["ServiceName"] = lstdetails[i].ServiceName;
                    row["ServiceTimings"] = lstdetails[i].ServiceTimings;
                    row["ServicePrice"] = lstdetails[i].ServicePrice;
                    table.Rows.Add(row);
                }
            }
            return table;
        }

        public DataTable GetAccommodationTimings(List<AccommodationTimingsModel> lstdetails)
        {

            var table = new DataTable();
            table.Columns.Add("TempleId", typeof(int));
            table.Columns.Add("RoomTypeId", typeof(int));
            table.Columns.Add("RoomType", typeof(string));
            table.Columns.Add("RoomTimings", typeof(string));
            table.Columns.Add("RoomPrice", typeof(double));
            if (lstdetails.Count > 0)
            {
                for (int i = 0; i < lstdetails.Count(); i++)
                {
                    var row = table.NewRow();
                    row["TempleId"] = lstdetails[i].TempleId;
                    row["RoomTypeId"] = lstdetails[i].RoomTypeId;
                    row["RoomType"] = lstdetails[i].RoomType;
                    row["RoomTimings"] = lstdetails[i].RoomTimings;
                    row["RoomPrice"] = lstdetails[i].RoomPrice;
                    table.Rows.Add(row);
                }
            }
            return table;
        }

        public List<Temple> GetTempleData(int TempleId)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("TempleId", TempleId, DbType.Int32);
            var result = dapper.GetAll<Temple>("[dbo].[SP_Get_AllTemples]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        
        public List<TempleType> GetTempleTypes()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<TempleType>("[dbo].[SP_Get_Temple_Type]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        
        public List<ServicesTimings> GetAllServicesTimings(int TempleId)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("TempleId", TempleId, DbType.Int32);
            var result = dapper.GetAll<ServicesTimings>("[dbo].[SP_Get_ServiceTimings]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        
        public List<AccommodationTimingsModel> GetAllAccommodationTimings(int TempleId)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("TempleId", TempleId, DbType.Int32);
            var result = dapper.GetAll<AccommodationTimingsModel>("[dbo].[SP_Get_AccommodationTimings]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        
        public List<TemplesWithTypesList> GetTemplesWithTypesList()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<TemplesWithTypesList>("[dbo].[SP_Temples_With_Types_List]"
                , dbParam
                , commandType: CommandType.StoredProcedure);
            return result;
        }        
        
        public List<TempleServiceUserRequest> GetTempleServiceUserRequest()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<TempleServiceUserRequest>("[dbo].[SP_Get_TempleServiceUserRequest]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
        
        public int DeleteTemple(TempleServicesAdminModel data)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("TempleId", data.TempleId, DbType.Int32);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);

            var result = dapper.Execute("[dbo].[SP_DeleteTemple]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
