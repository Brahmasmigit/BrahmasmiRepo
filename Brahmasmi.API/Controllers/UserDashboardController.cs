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
    public class UserDashboardController : ControllerBase
    {
        private readonly IUserDashboardRepository userDashboardRepository;
        private readonly ILogger<LoginController> logger;
        public UserDashboardController(IUserDashboardRepository _userDashboardRepository, ILogger<LoginController> _logger)
        {
            userDashboardRepository = _userDashboardRepository;
            logger = _logger;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<UserDashboard>> GetOngoing(int userid, string calendarType)
        {
            try
            {
                var result = await Task.FromResult(userDashboardRepository.GetOngoing(userid, calendarType));
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
        public async Task<ActionResult<Ratings>> UserRatings(Ratings ratings)
        {
            try
            {
                var result = await Task.FromResult(userDashboardRepository.UserRatings(ratings));
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
        public async Task<ActionResult<StoreDashboard>> GetUserProductOrderdetails(int userid, string usertype, string calendartype)
        {
            try
            {
                var result = await Task.FromResult(userDashboardRepository.GetUserProductDetails(userid, usertype, calendartype));
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
