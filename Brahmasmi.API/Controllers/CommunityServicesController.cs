using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class CommunityServicesController : ControllerBase
    {
        private readonly ICommunityServicesRepository CommunityServicesRepository;
        private readonly ILogger<CommunityServicesController> logger;
        public CommunityServicesController(ICommunityServicesRepository _CommunityServicesRepository, ILogger<CommunityServicesController> _logger)
        {
            CommunityServicesRepository = _CommunityServicesRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<CommunityServices>> RegisterCommunityService(CommunityServices slot)
        {
            try
            {
                var result = await Task.FromResult(CommunityServicesRepository.RegisterCommunityServices(slot));
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
        public async Task<ActionResult<CommunityCategories>> GetCommunityCategories()
        {
            try
            {
                var result = await Task.FromResult(CommunityServicesRepository.GetCommunityCategories());
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
        public async Task<ActionResult<CommunityServices>> GetAllCommunityCategories()
        {
            try
            {
                var result = await Task.FromResult(CommunityServicesRepository.GetAllCommunityCategories());
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
