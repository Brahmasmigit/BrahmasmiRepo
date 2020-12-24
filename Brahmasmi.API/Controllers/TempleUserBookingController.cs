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
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Brahmasmi.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TempleUserBookingController : ControllerBase
    {
        private readonly ITempleUserBookingRepository templeUserBookingRepository;
        private readonly ILogger<TempleUserBookingController> logger;
        private readonly ILogger<Email> emaillogger;
        private readonly IConfiguration configuration;
        public TempleUserBookingController(ITempleUserBookingRepository _templeUserBookingController, ILogger<TempleUserBookingController> _logger, ILogger<Email> _emaillogger, IConfiguration _configuration)
        {
            templeUserBookingRepository = _templeUserBookingController;
            logger = _logger;
            emaillogger = _emaillogger;
            configuration = _configuration;
        }
        //public async Task<ActionResult<TempleOrders>> TempleUserSlotBooking(List<TempleUserBooking> userBooking)
        //{
        //    try
        //    {
        //        List<TempleOrders> result = await Task.FromResult(templeUserBookingController.UserBooking(userBooking));
        //        if (result.Count > 0)
        //        {
        //            if (result[0].Result == 1)
        //            {
        //                Email mail = new Email(emaillogger, configuration);
        //                string body = " Your order has been successfully placed. We will manually check your Payment and update the status.";
        //                var response = mail.SendEmail(userBooking[0].EmailId, userBooking[0].UserName, "Order is Successful", body);
        //            }
        //        }
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        logger.LogError($"Exception at Login Method: {ex}");
        //        return StatusCode(500, ex);
        //    }
        //}

        [HttpPost]
        public async Task<ActionResult<TempleOrders>> TempleUserSlotBooking(TempleUserBooking userBooking)
        {
            try
            {
                List<TempleOrders> result = await Task.FromResult(templeUserBookingRepository.UserBooking(userBooking));
                if (result.Count > 0)
                {
                    if (result[0].Result == 1)
                    {
                        Email mail = new Email(emaillogger, configuration);
                        string body = " Your order has been successfully placed. We will manually check your Payment and update the status.";
                        var response = mail.SendEmail(userBooking.EmailId, userBooking.UserName, "Order is Successful", body);
                    }
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, ex);
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<Tuple<List<TempleOrderDetailService>, List<TempleOrderDetailServiceAccommodation>>>> GetTempleOrderDetails(string invoiceno)
        {
            try
            {
                var result = await Task.FromResult(templeUserBookingRepository.GetTempleOrderDetails(invoiceno));
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
        public async Task<ActionResult<Tuple<List<TempleOrderDetailService>, List<TempleOrderDetailServiceAccommodation>>>> GetTempleUserDashboardData(int userId)
        {
            try
            {
                var result = await Task.FromResult(templeUserBookingRepository.GetTempleUserDashboard(userId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        //[EnableCors("CorsPolicy")]
        //[HttpGet]
        //public async Task<ActionResult<TempleUserDashboardModel> GetTempleUserDashboardData(int userId)
        //    {
        //    }
    }
}