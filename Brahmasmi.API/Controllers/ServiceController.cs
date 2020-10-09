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
    }
}
