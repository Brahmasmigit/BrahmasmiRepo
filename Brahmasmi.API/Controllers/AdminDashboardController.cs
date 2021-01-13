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
using System.Net;
using System.Web;
using System.Collections.Specialized;
using Newtonsoft.Json.Linq;

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
        private readonly ILogger<SMS> smslogger;
        public AdminDashboardController(IAdminDashboardRepository _adminDashboardRepository, ILogger<AdminDashboardController> _logger, IBookingChangeStatusRepository _bookingChangeStatusRepository, ILogger<SMS> _smslogger)
        {
            adminDashboardRepository = _adminDashboardRepository;
            logger = _logger;
            smslogger = _smslogger;
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
                if(result==1)
                {
                    string recipient = booking.Vendor_MobileNumber;
                    string message = "Greetings from Brahmasmi!! Your gracious presence is required for performing ______ Pooja on date ______; time______; location _______. Please confirm on Brahmasmi website whether you are available or not available for the respective event. Thank you.";
                       // "Hello " + booking.Vendor_Name + ", Greetings from Brahmasmi!! Thank you for choosing us. Your invoice number  " + Invoice + " is being processed by us. Our team will come back to you in a short time.";
                    string encodeMessage = HttpUtility.UrlEncode(message);
                    SMS sms = new SMS(smslogger);
                    var smsresponse = sms.SendSMS(recipient, encodeMessage);
                }
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
