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
    }
}
