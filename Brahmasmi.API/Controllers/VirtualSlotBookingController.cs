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
    public class VirtualSlotBookingController : ControllerBase
    {
        private readonly IVirtualSlotBookingRepository virtualSlotBookingRepository;
        private readonly ILogger<VirtualSlotBookingController> logger;
        public VirtualSlotBookingController(IVirtualSlotBookingRepository _virtualSlotBookingRepository, ILogger<VirtualSlotBookingController> _logger)
        {
            virtualSlotBookingRepository = _virtualSlotBookingRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<VirtualSlotBooking>> BookVirtualSlot(VirtualSlotBooking slot)
        {
            try
            {
                var result = await Task.FromResult(virtualSlotBookingRepository.VirtualVideoSlot(slot));
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

