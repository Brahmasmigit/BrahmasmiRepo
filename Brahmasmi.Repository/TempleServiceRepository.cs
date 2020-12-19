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
            dbParam.Add("TempleDescription", adminModel.TempleDescription, DbType.String);
            dbParam.Add("StateId", adminModel.StateId, DbType.Int32);
            dbParam.Add("CityId", adminModel.CityId, DbType.Int32);
            dbParam.Add("CustomerReviews", adminModel.CustomerReviews, DbType.String);
            dbParam.Add("Action", adminModel.Action, DbType.String);
            dbParam.Add("TempleImage", bytes, DbType.Binary);
            dbParam.Add("TempleImageFileName", adminModel.TempleImageFileName, DbType.String);

            if (!(adminModel.ServicesTimings == null))
            {
                DataTable serviceTimings = new DataTable();
                serviceTimings = GetServiceTimings(adminModel.ServicesTimings);
                dbParam.Add("ServiceTimings", serviceTimings.AsTableValuedParameter("dbo.TT_ServiceTimings"));
            }

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Temple_Transaction]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;
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
        public List<TemplesWithTypesList> GetTemplesWithTypesList()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<TemplesWithTypesList>("[dbo].[SP_Temples_With_Types_List]"
                , dbParam
                , commandType: CommandType.StoredProcedure);
            return result;
        }
        public int SaveUserServiceRequest(UserServiceRequestModel request)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("UserName", request.UserName, DbType.String);
            dbParam.Add("UserEmail", request.UserEmail, DbType.String);
            dbParam.Add("UserMobileNo", request.UserMobileNo, DbType.String);
            dbParam.Add("TempleId", request.TempleId, DbType.Int32);
            dbParam.Add("UserRequestQuery", request.UserRequestQuery, DbType.String);

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Temple_User_Service_Request]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
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
