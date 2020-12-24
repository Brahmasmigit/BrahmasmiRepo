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
    public class ConcernEnquiryController : ControllerBase
    {
        private readonly IConcernEnquiryRepository concernEnquiryRepository;
        private readonly ILogger<ConcernEnquiryController> logger;
        public ConcernEnquiryController(IConcernEnquiryRepository _concernEnquiryRepository, ILogger<ConcernEnquiryController> _logger)
        {
            concernEnquiryRepository = _concernEnquiryRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<ConcernTypes>> GetAllConcernTypes()
        {
            try
            {
                var result = await Task.FromResult(concernEnquiryRepository.GetConcernTypes());
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
        public async Task<ActionResult<ConcernEnquiry>> AddConcernDetails(ConcernEnquiry concern)
        {
            try
            {
                var result = await Task.FromResult(concernEnquiryRepository.AddConcernDetails(concern));
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
