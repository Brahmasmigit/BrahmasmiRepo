﻿using System;
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
    public class AdminDashboardController : ControllerBase
    {
        private readonly IAdminDashboardRepository adminDashboardRepository;
        private readonly IBookingChangeStatusRepository bookingChangeStatusRepository;
        private readonly ILogger<AdminDashboardController> logger;
        public AdminDashboardController(IAdminDashboardRepository _adminDashboardRepository, ILogger<AdminDashboardController> _logger, IBookingChangeStatusRepository _bookingChangeStatusRepository)
        {
            adminDashboardRepository = _adminDashboardRepository;
            logger = _logger;
            bookingChangeStatusRepository = _bookingChangeStatusRepository;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<AdminDashboard>> GetBookingData(int statusid, string bookingdate)
        {
            try
            {
                var result = await Task.FromResult(adminDashboardRepository.GetBookingData(statusid, bookingdate));
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

        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<VendorBooking>> UpdateVendor(VendorBooking booking)
        {
            try
            {
                var result = await Task.FromResult(bookingChangeStatusRepository.UpdateVendor(booking));
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
