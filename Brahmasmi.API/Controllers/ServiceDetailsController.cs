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
    public class ServiceDetailsController : ControllerBase
    {
        private readonly IServiceDetailsRepository serviceDetailsRepository;
        private readonly ILogger<LoginController> logger;
        public ServiceDetailsController(IServiceDetailsRepository _serviceDetailsRepository, ILogger<LoginController> _logger)
        {
            serviceDetailsRepository = _serviceDetailsRepository;
            logger = _logger;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet("{serviceid}")]
        public async Task<ActionResult<ServiceDetails>> GetServiceDetails(int serviceid)
        {
            try
            {
                var result = await Task.FromResult(serviceDetailsRepository.GetServiceDetails(serviceid));
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
