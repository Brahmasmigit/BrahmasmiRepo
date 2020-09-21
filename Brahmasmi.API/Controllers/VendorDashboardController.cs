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
    public class VendorDashboardController : ControllerBase
    {
        private readonly IVendorDashboardRepository vendorDashboardRepository;
        private readonly IBookingChangeStatusRepository bookingChangeStatusRepository;
        private readonly ILogger<LoginController> logger;
        public VendorDashboardController(IVendorDashboardRepository _vendorDashboardRepository, ILogger<LoginController> _logger, IBookingChangeStatusRepository _bookingChangeStatusRepository)
        {
            vendorDashboardRepository = _vendorDashboardRepository;
            logger = _logger;
            bookingChangeStatusRepository = _bookingChangeStatusRepository;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet("{vendorid}")]
        public async Task<ActionResult<VendorDashboard>> GetOngoing(int vendorid)
        {
            try
            {
                var result = await Task.FromResult(vendorDashboardRepository.GetOngoing(vendorid));
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
        public async Task<ActionResult<BookingChangeStatus>> ChangeBookingStatus(BookingChangeStatus booking)
        {
            try
            {
                var result = await Task.FromResult(bookingChangeStatusRepository.BookingChangeStatus(booking));
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
