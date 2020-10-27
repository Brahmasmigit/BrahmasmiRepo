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
    public class UserBookingController : ControllerBase
    {
        private readonly IUserBookingRepository userBookingRepository;
        private readonly ILogger<LoginController> logger;
        private readonly ILogger<Email> emaillogger;
        private readonly IConfiguration configuration;
        public UserBookingController(IUserBookingRepository _userBookingRepository, ILogger<LoginController> _logger, ILogger<Email> _emaillogger, IConfiguration _configuration)
        {
            userBookingRepository = _userBookingRepository;
            logger = _logger;
            emaillogger = _emaillogger;
            configuration = _configuration;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<Orders>> UserSlotBooking(List<UserBooking> userBooking)
        {
            try
            {
                List<Orders> result  = await Task.FromResult(userBookingRepository.UserBooking(userBooking));
                if (result.Count > 0)
                {
                    if (result[0].Result == 1)
                    {
                        Email mail = new Email(emaillogger, configuration);
                        string body = " Your order has been successfully placed. We will manually check your Payment and update the status.";
                        var response = mail.SendEmail(userBooking[0].EmailId, userBooking[0].UserName, "Order is Successful", body);
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
        [HttpGet("{userid}")]
        public async Task<ActionResult<UserDetails>> GetUserDetails(int userid)
        {
            try
            {
                var result = await Task.FromResult(userBookingRepository.GetUserDetails(userid));
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
