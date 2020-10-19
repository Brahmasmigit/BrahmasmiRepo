using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class ServiceRepository : IServiceRepository
    {
        private readonly IDapper dapper;
        public ServiceRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<Services> GetServices(int servicetypeid, int cityid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("servicetypeid", servicetypeid, DbType.Int32);
            dbParam.Add("cityid", cityid, DbType.Int32);
            var result = dapper.GetAll<Services>("[dbo].[SP_GETSERVICES]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<Services> SearchServices(string search)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("search", search, DbType.String);
            var result = dapper.GetAll<Services>("[dbo].[SP_SEARCHSERVICE]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
           // dapper.ExecuteTableType();
            return result;

        }
        public int AddService(IFormFile imageFile, ServiceModel serviceModel)
        {
            var dbParam = new DynamicParameters();
            // var uploadFile = Request.Form.Files[0];
            var uploadFile = imageFile;
            long length = uploadFile.Length;
            byte[] bytes = new byte[length];
            var reader = uploadFile.OpenReadStream();
            reader.ReadAsync(bytes, 0, Convert.ToInt32(length));
            reader.Close();
            dbParam.Add("ServiceTypeID", serviceModel.ServiceTypeID, DbType.Int32);
            dbParam.Add("ServiceID", serviceModel.ServiceID, DbType.Int32);
            dbParam.Add("CityID", serviceModel.CityID, DbType.Int32);
            dbParam.Add("ServiceName", serviceModel.ServiceName, DbType.String);
            dbParam.Add("ServiceImageFile", serviceModel.ServiceImageFile, DbType.String);
            dbParam.Add("Servcie_Short_Description", serviceModel.Servcie_Short_Description, DbType.String);
            dbParam.Add("Service_Long_Description", serviceModel.Service_Long_Description, DbType.String);
            dbParam.Add("ServiceImage", bytes, DbType.Binary);
            dbParam.Add("Action", serviceModel.Action, DbType.String);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_InsertUpdate_Service]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<ServiceModel> GetAllServices()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<ServiceModel>("[dbo].[SP_Get_AllService]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<City> GetServiceTypeCity(int ServiceTypeID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("ServiceTypeID", ServiceTypeID, DbType.Int32);
            var result = dapper.GetAll<City>("[dbo].[SP_Get_ServiceTypeCity]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int DeleteService(ServiceModel serviceModel)
        {
            var dbParam = new DynamicParameters();

            dbParam.Add("ServiceID", serviceModel.ServiceID, DbType.Int32);
            dbParam.Add("CityID", serviceModel.CityID, DbType.Int32);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Delete_Service]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }



    }
}
