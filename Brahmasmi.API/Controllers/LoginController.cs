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
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepository loginRepository;
        private readonly IRegisterRepository registerRepository;
        private readonly ILogger<LoginController> logger;
        public LoginController(ILoginRepository _loginRepository, ILogger<LoginController> _logger, IRegisterRepository _registerRepository)
        {
            loginRepository = _loginRepository;
            logger = _logger;
            registerRepository = _registerRepository;
        }

        // GET api/Login/mobilenumber
        [EnableCors("CorsPolicy")]
        [HttpGet("{MobileNumber}")]
        public async Task<ActionResult<Login>> Login(string mobileNumber)
        {
            try
            {
                logger.LogInformation(mobileNumber);
                var result = await Task.FromResult(loginRepository.Login(mobileNumber));
                //throw new Exception("Exception while fetching...");
                logger.LogInformation("end");
                return Ok(result);
            }
            catch(Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<Register>> Register(Register register)
        {
            try
            {
                
                var result = await Task.FromResult(registerRepository.RegisterUser(register));
                //throw new Exception("Exception while fetching...");
                logger.LogInformation("end");
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
