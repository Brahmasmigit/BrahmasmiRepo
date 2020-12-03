using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Brahmasmi.Models;
using Brahmasmi.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Brahmasmi.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TempleServicesController : ControllerBase
    {
        private readonly ILogger<TempleServicesController> logger;
        private readonly ITempleServiceRepository templeRepository;

        public TempleServicesController(ITempleServiceRepository _templeServiceRepository, ILogger<TempleServicesController> _logger)
        {
            templeRepository = _templeServiceRepository;
            logger = _logger;

        }

        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<int>> RegisterTemple(TempleServicesAdminModel templeServicesAdminModel)
        {
            try
            {
                var result = await Task.FromResult(templeRepository.AddTempleAdminData(templeServicesAdminModel));

                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpGet("{TempleId}")]
        public async Task<ActionResult<List<Temple>>> GetTempleData(int TempleId)
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetTempleData(TempleId));
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
        public async Task<ActionResult<List<TempleType>>> GetTempleTypes()
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetTempleTypes());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpGet("{TempleId}")]
        public async Task<ActionResult<List<ServicesTimings>>> GetAllServicesTimings(int TempleId)
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetAllServicesTimings(TempleId));
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
        public async Task<ActionResult<List<TemplesWithTypesList>>> GetTemplesWithTypesList()
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetTemplesWithTypesList());
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