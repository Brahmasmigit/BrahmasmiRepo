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
    public class AstrologyCategoriesController : ControllerBase
    {
        private readonly IAstrologyCategoriesRepository astrologyCategoriesRepository;
        private readonly ILogger<AstrologyCategoriesController> logger;
        public AstrologyCategoriesController(IAstrologyCategoriesRepository _astrologyCategoriesRepository, ILogger<AstrologyCategoriesController> _logger)
        {
            astrologyCategoriesRepository = _astrologyCategoriesRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<AstrologyCategories>> GetAstrologyCategories()
        {
            try
            {
                var result = await Task.FromResult(astrologyCategoriesRepository.GetAstrologyCategories());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{AstrologyID}")]
        public async Task<ActionResult<AstrologyCategories>> GetAstrologyAmount(int AstrologyID)
        {
            try
            {
                var result = await Task.FromResult(astrologyCategoriesRepository.GetCategoryAmount(AstrologyID));
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
