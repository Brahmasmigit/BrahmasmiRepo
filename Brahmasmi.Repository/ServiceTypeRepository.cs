using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class ServiceTypeRepository : IServiceTypeRepository
    {
        private readonly IDapper dapper;
        public ServiceTypeRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }
        public List<ServiceType> GetServiceTypes(int cityid)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("cityid", cityid, DbType.Int32);
            var result = dapper.GetAll<ServiceType>("[dbo].[SP_GETSERVICETYPES]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public List<ServiceType> GetAllServiceTypes()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<ServiceType>("[dbo].[SP_Get_AllServiceTypes]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int AddUpdateServiceType(IFormFile imageFile, ServiceType serviceType)
        {
            var dbParam = new DynamicParameters();
            // var uploadFile = Request.Form.Files[0];
            var uploadFile = imageFile;
            long length = uploadFile.Length;
            byte[] bytes = new byte[length];
            var reader = uploadFile.OpenReadStream();
            reader.ReadAsync(bytes, 0, Convert.ToInt32(length));
            reader.Close();


            dbParam.Add("ServiceTypeName", serviceType.ServiceTypeName, DbType.String);
            dbParam.Add("CityID", serviceType.CityID, DbType.Int32);
            dbParam.Add("Action", serviceType.Action, DbType.String);
            dbParam.Add("ServiceTypeID", serviceType.ServiceTypeID, DbType.Int32);
            dbParam.Add("ServiceTypeImage", bytes, DbType.Binary);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_InsertUpdate_ServiceType]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int DeleteServiceType(ServiceType serviceType)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("ServiceTypeID", serviceType.ServiceTypeID, DbType.Int32);
            dbParam.Add("CityID", serviceType.CityID, DbType.Int32);
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Delete_ServiceType]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
