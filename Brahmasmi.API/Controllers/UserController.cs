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
    
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;
        private readonly IUserRepository userRepository;
        public UserController(ILogger<UserController> _logger, IUserRepository _userRepository)
        {
            userRepository = _userRepository;
            logger = _logger;
        }
     
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<int>> RegisterUser(UserLogin user)
        {
            try
            {

                var result = await Task.FromResult(userRepository.Login(user));
                logger.LogInformation("end");
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
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            try
            {

                var result = await Task.FromResult(userRepository.UpdateUser(user));
                logger.LogInformation("end");
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{UserID}")]
        public async Task<ActionResult<User>> GetUser(int userid)
        {
            try
            {
                var result = await Task.FromResult(userRepository.GetUser(userid));
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
