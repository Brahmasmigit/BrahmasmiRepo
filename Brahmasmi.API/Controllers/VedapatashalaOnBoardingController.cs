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
    public class VedapatashalaOnBoardingController : ControllerBase
    {
        private readonly ILogger<VedapatashalaOnBoardingController> logger;
        private readonly IVedapatashalaOnBoardingRepository VedapatashalaOnBoardingRepository;
        public VedapatashalaOnBoardingController(ILogger<VedapatashalaOnBoardingController> _logger, IVedapatashalaOnBoardingRepository _VedapatashalaOnBoardingRepository)
        {
            VedapatashalaOnBoardingRepository = _VedapatashalaOnBoardingRepository;
            logger = _logger;
        }

       
        
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<VedapatashalaOnBoarding>> vedapatashalaonboarding(VedapatashalaOnBoarding vedapatashalaonboarding)
        {
            try
            {

                var result = await Task.FromResult(VedapatashalaOnBoardingRepository.vedapatashalaonboarding(vedapatashalaonboarding));
                //throw new Exception("Exception while fetching...");
                logger.LogInformation("end");
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        public async Task<ActionResult<VedapatashalaOnBoarding>> GetVedapatashalaOnBoarding()
        {
            try
            {
                
                var result = await Task.FromResult(VedapatashalaOnBoardingRepository.GetVedapatashalaOnBoarding());
              



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
