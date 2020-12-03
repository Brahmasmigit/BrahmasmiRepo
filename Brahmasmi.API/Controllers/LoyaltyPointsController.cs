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
    public class LoyaltyPointsController : ControllerBase
    {
        private readonly ILoyaltyPointsRepository loyaltyPointsRepository;
        private readonly ILogger<LoyaltyPointsController> logger;
        public LoyaltyPointsController(ILoyaltyPointsRepository _loyaltyPointsRepository, ILogger<LoyaltyPointsController> _logger)
        {
            loyaltyPointsRepository = _loyaltyPointsRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<LoyaltyPointsModel>> GetAllLoyaltyPoints()
        {
            try
            {
                var result = await Task.FromResult(loyaltyPointsRepository.GetLoyaltyPoints());
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
        public async Task<ActionResult<LoyaltyPointsModel>> DeleteLoyalty(LoyaltyPointsModel loyalty)
        {
            try
            {
                var result = await Task.FromResult(loyaltyPointsRepository.DeleteLoyaltyPoints(loyalty));
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
        public async Task<ActionResult<LoyaltyPointsModel>> SaveloyaltyPoints(LoyaltyPointsModel loyalty)
        {
            try
            {
                var result = await Task.FromResult(loyaltyPointsRepository.AddUpdateLoyaltyPoints(loyalty));
                logger.LogInformation("end");
                return Ok(result);

            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, ex);
            }
        }
    }
}


