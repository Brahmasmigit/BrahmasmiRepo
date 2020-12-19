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
    public class HoroscopeController : ControllerBase
    {
        private readonly IHoroscopeRepository horoscopeRepository;
        private readonly ILogger<HoroscopeController> logger;
        public HoroscopeController(IHoroscopeRepository _horoscopeRepository, ILogger<HoroscopeController> _logger)
        {
            horoscopeRepository = _horoscopeRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<Horoscope>> GetAllHoroscope()
        {
            try
            {
                var result = await Task.FromResult(horoscopeRepository.GetHoroscopes());
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
        public async Task<ActionResult<HoroscopeDetails>> GetTodayHoroscope()
        {
            try
            {
                var result = await Task.FromResult(horoscopeRepository.GetTodayHoroscopeDetails());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{HoroscopeID}")]
        public async Task<ActionResult<HoroscopeDetails>> GetHoroscopeDetails(int HoroscopeID)
        {
            try
            {
                var result = await Task.FromResult(horoscopeRepository.GetHoroscopeDetails(HoroscopeID));
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
        public async Task<ActionResult<HoroscopeDetails>> AddHoroscopeDetails(HoroscopeDetails horoscope)
        {
            try
            {
                var result = await Task.FromResult(horoscopeRepository.AddHoroscopeDetails(horoscope));
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
