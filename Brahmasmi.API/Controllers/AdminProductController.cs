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
    public class AdminProductController : ControllerBase
    {
        private readonly IAdminProductRepository adminProductRepository;
        private readonly IBookingChangeStatusRepository bookingChangeStatusRepository;
        private readonly ILogger<AdminProductController> logger;
        public AdminProductController(IAdminProductRepository _adminProductRepository, ILogger<AdminProductController> _logger, IBookingChangeStatusRepository _bookingChangeStatusRepository)
        {
            adminProductRepository = _adminProductRepository;
            logger = _logger;
            bookingChangeStatusRepository = _bookingChangeStatusRepository;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<StoreDashboard>> GetBookingData(int statusid, string bookingdate)
        {
            try
            {
                var result = await Task.FromResult(adminProductRepository.GetBookingData(statusid, bookingdate));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, ex);
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<BookingChangeStatus>> ChangeBookingStatus(BookingChangeStatus booking)
        {
            try
            {
                var result = await Task.FromResult(bookingChangeStatusRepository.ProductBookingChangeStatus(booking));
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
        public async Task<ActionResult<StoreBooking>> UpdateVendor(StoreBooking booking)
        {
            try
            {
                var result = await Task.FromResult(bookingChangeStatusRepository.UpdateStore(booking));
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
