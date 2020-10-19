using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Brahmasmi.Models;
using Brahmasmi.Repository;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Cors;


namespace Brahmasmi.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository serviceRepository;
        private readonly ILogger<LoginController> logger;
        public ServiceController(IServiceRepository _serviceRepository, ILogger<LoginController> _logger)
        {
            serviceRepository = _serviceRepository;
            logger = _logger;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<Services>> GetServices(int servicetypeId, int cityId)
        {
            try
            {
                var result = await Task.FromResult(serviceRepository.GetServices(servicetypeId, cityId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{search}")]
        public async Task<ActionResult<Services>> SearchService(string search)
        {
            try
            {
                var result = await Task.FromResult(serviceRepository.SearchServices(search));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<ServiceModel>> SaveService()
        {
            try
            {
                var imageFile = Request.Form.Files[0];
                var imageFileName = imageFile.FileName;
                var serviceTypeID = Convert.ToInt32(Request.Form["serviceTypeID"]);
                var serviceID = Request.Form["serviceID"];
                var cityID = Convert.ToInt32(Request.Form["cityID"]);
                var serviceName = Request.Form["serviceName"].ToString();
                var serviceShortDescription = Request.Form["serviceShortDescription"].ToString();
                var serviceLongDescription = Request.Form["serviceLongDescription"].ToString();
                var action = Request.Form["action"].ToString();

                ServiceModel serviceModel = new ServiceModel();
                if (action == "Update")
                {
                    if (serviceID != "")
                    {
                        var serviceId = Convert.ToInt32(Request.Form["serviceID"]);
                        serviceModel.ServiceID = serviceId;
                    }


                }
                else
                {
                    //  var serviceTypeID = DBNull.Value;
                    serviceModel.ServiceID = 0;
                }
                serviceModel.ServiceTypeID = serviceTypeID;
                serviceModel.CityID = cityID;
                serviceModel.ServiceName = serviceName;
                serviceModel.Servcie_Short_Description = serviceShortDescription;
                serviceModel.Service_Long_Description = serviceLongDescription;
                serviceModel.Action = action;
                serviceModel.ServiceImageFile = imageFileName;

                var result = await Task.FromResult(serviceRepository.AddService(imageFile, serviceModel));
                //throw new Exception("Exception while fetching...");
                logger.LogInformation("end");
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<ServiceModel>> GetAllServices()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(serviceRepository.GetAllServices());
                //throw new Exception("Exception while fetching...");
                // logger.LogInformation("end");

                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{ServiceTypeID}")]
        public async Task<ActionResult<City>> GetServiceTypeCity(int ServiceTypeID)
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(serviceRepository.GetServiceTypeCity(ServiceTypeID));
                //throw new Exception("Exception while fetching...");
                // logger.LogInformation("end");

                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<ServiceType>> DeleteService(ServiceModel serviceModel)
        {
            try
            {
                var result = await Task.FromResult(serviceRepository.DeleteService(serviceModel));
                logger.LogInformation("end");
                return Ok(result);

            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
