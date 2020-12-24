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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SpecialserviceController : Controller
    {
        private readonly ISpecialserviceRepository specialserviceRepository;
        private readonly ILogger<SpecialserviceController> logger;
       
        public SpecialserviceController(ISpecialserviceRepository _specialserviceRepository, ILogger<SpecialserviceController> _logger)
        {
            specialserviceRepository = _specialserviceRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<SpecialServices>> GetSpecialServices()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(specialserviceRepository.GetSpecialservices());
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
        public async Task<ActionResult<SpecialServicesEnquiry>> GetAllSpecialServicesEnquiry()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(specialserviceRepository.GetAllSpecialServicesEnquiry());
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
        public async Task<ActionResult<SpecialServicesEnquiry>> RegisterSpecialServiceEnquiry(SpecialServicesEnquiry service)
        {
            try
            {
                var result = await Task.FromResult(specialserviceRepository.AddSpecialservice(service));
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