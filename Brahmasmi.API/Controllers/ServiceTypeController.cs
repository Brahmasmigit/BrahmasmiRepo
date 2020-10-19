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
    public class ServiceTypeController : ControllerBase
    {
        private readonly IServiceTypeRepository serviceTypeRepository;
        private readonly ILogger<LoginController> logger;
        public ServiceTypeController(IServiceTypeRepository _serviceTypeRepository, ILogger<LoginController> _logger)
        {
            serviceTypeRepository = _serviceTypeRepository;
            logger = _logger;
        }

      
        [EnableCors("CorsPolicy")]
        [HttpGet("{CityId}")]
        public async Task<ActionResult<ServiceType>> GetServiceTypes(int cityid)
        {
            try
            {
                var result = await Task.FromResult(serviceTypeRepository.GetServiceTypes(cityid));
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
        public async Task<ActionResult<ServiceType>> GetAllServiceTypes()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(serviceTypeRepository.GetAllServiceTypes());
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
        public async Task<ActionResult<ServiceType>> DeleteServiceType(ServiceType serviceType)
        {
            try
            {
                var result = await Task.FromResult(serviceTypeRepository.DeleteServiceType(serviceType));
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
        [HttpPost]
        public async Task<ActionResult<ServiceType>> SaveServiceType()
        {
            try
            {
                var imageFile = Request.Form.Files[0];
                var serviceTypeName = Request.Form["serviceTypeName"].ToString();
                var cityID = Convert.ToInt32(Request.Form["cityID"]);
                var action = Request.Form["action"].ToString();
                ServiceType serviceType = new ServiceType();
                if (action == "Update")
                {
                    var serviceTypeID = Convert.ToInt32(Request.Form["serviceTypeID"]);
                    serviceType.ServiceTypeID = serviceTypeID;
                }
                else
                {
                    //  var serviceTypeID = DBNull.Value;
                    serviceType.ServiceTypeID = 0;
                }

                serviceType.ServiceTypeName = serviceTypeName;
                serviceType.CityID = cityID;
                serviceType.Action = action;

                var result = await Task.FromResult(serviceTypeRepository.AddUpdateServiceType(imageFile, serviceType));
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
