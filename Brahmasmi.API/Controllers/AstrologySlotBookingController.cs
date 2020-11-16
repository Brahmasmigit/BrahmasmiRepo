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
    public class AstrologySlotBookingController : ControllerBase
    {
        private readonly IAstrologySlotBookingRepository astrologySlotBookingRepository;
        private readonly ILogger<AstrologySlotBookingController> logger;
        public AstrologySlotBookingController(IAstrologySlotBookingRepository _astrologySlotBookingRepository, ILogger<AstrologySlotBookingController> _logger)
        {
            astrologySlotBookingRepository = _astrologySlotBookingRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<AstrologySlotBooking>> BookAstrologySlot(AstrologySlotBooking slot)
        {
            try
            {
                var result = await Task.FromResult(astrologySlotBookingRepository.BookAstrologySlot(slot));
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

