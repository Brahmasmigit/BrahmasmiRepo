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
using System.Text.RegularExpressions;
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
        public async Task<ActionResult<User>> UserExist(string mobileNumber)
        {
            try
            {
                logger.LogInformation(mobileNumber);
                var result = await Task.FromResult(loginRepository.UserLogin(mobileNumber));
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
        [HttpGet("{MobileNumber}")]
        public async Task<ActionResult<Vendor>> VendorExist(string mobileNumber)
        {
            try
            {
                logger.LogInformation(mobileNumber);
                var result = await Task.FromResult(loginRepository.VendorLogin(mobileNumber));
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
        [HttpGet("{MobileNumber}")]
        public async Task<ActionResult<Store>> StoreExist(string mobileNumber)
        {
            try
            {
                logger.LogInformation(mobileNumber);
                var result = await Task.FromResult(loginRepository.StoreExist(mobileNumber));
                logger.LogInformation("end");

                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPost]
        public async Task<ActionResult<OTPVerification>> SendOTP(OTPVerification otpVerify)
        {
            var result = await Task.FromResult(VerifyOTP(otpVerify));
            return Ok(result);

        }
        public int VerifyOTP(OTPVerification otpVerify)
        {
            //OTP
            int otpValue = new Random().Next(1000, 9999);
            //------------------------
            string recipient = otpVerify.MobileNumber;

            // string APIKey = "YhXzmkn/LGA-ECfHcE62lySEGYjUIsvD3Q1xgJogSu";
            string APIKey = "	ta4CU4qPeg4-wtcxjqOwmc9kguaVbeCrrfxBegIrc7";
            string message = "Your OTP is " + otpValue;
            //string encodeMessage = HttpUtility.UrlEncode(message);

            //using (var webClient = new WebClient())
            //{
            //    byte[] response = webClient.UploadValues("https://api.textlocal.in/send", new NameValueCollection()
            //        {
            //            {"apikey",APIKey },
            //            {"numbers",recipient },
            //            { "message",encodeMessage},
            //            {"sender","TXTLCL" }
            //        });
            //   string results = System.Text.Encoding.UTF8.GetString(response);
            // var jsonObject = JObject.Parse(results);


            ///}
            return otpValue;
        }
    }
}
