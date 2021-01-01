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
    public class PoojaSubscriptionFormController : Controller
    {
        private readonly IPoojaSubscriptionFormRepository PoojaSubscriptionFormRepository;
        private readonly ILogger<PoojaSubscriptionFormController> logger;

        public PoojaSubscriptionFormController(IPoojaSubscriptionFormRepository _PoojaSubscriptionFormRepository, ILogger<PoojaSubscriptionFormController> _logger)
        {
            PoojaSubscriptionFormRepository = _PoojaSubscriptionFormRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<PoojaSubscriptionForm>> GetAllSubscriptionForm()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(PoojaSubscriptionFormRepository.GetAllSubscriptionForm());
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
        public async Task<ActionResult<PoojaServices>> GetPoojaServices()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(PoojaSubscriptionFormRepository.GetPoojaServices());
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
        public async Task<ActionResult<SubscriptionCategory>> GetSubscriptionCategory()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(PoojaSubscriptionFormRepository.GetSubscriptionCategory());
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
        public async Task<ActionResult<PoojaSubscriptionForm>> SubscriptionForm(PoojaSubscriptionForm Form)
        {
            try
            {
                var result = await Task.FromResult(PoojaSubscriptionFormRepository.AddPoojaSubscriptionForm(Form));
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