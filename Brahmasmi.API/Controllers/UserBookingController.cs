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
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Brahmasmi.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserBookingController : ControllerBase
    {
        private readonly IUserBookingRepository userBookingRepository;
        private readonly ILogger<LoginController> logger;
        public UserBookingController(IUserBookingRepository _userBookingRepository, ILogger<LoginController> _logger)
        {
            userBookingRepository = _userBookingRepository;
            logger = _logger;
        }

        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<Orders>> UserSlotBooking(List<UserBooking> userBooking)
        {
            try
            {
                var result = await Task.FromResult(userBookingRepository.UserBooking(userBooking));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
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
