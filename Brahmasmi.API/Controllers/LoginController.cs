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
using System.Web;
using System.Net;
using System.Collections;
using System.Collections.Specialized;
using Newtonsoft.Json.Linq;
using System.Text;
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
        [HttpPost]
        public async Task<ActionResult<User>> UserExist(UserLogin user)
        {
            try
            {
                var result = await Task.FromResult(loginRepository.UserLogin(user));
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
        public async Task<ActionResult<Vendor>> VendorExist(UserLogin user)
        {
            try
            {
                var result = await Task.FromResult(loginRepository.VendorLogin(user));
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
        public async Task<ActionResult<Store>> StoreExist(UserLogin user)
        {
            try
            {
                var result = await Task.FromResult(loginRepository.StoreExist(user));

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
             int otpValue = new Random().Next(1000, 9999);
            //StringBuilder msg = new StringBuilder("Dear User", 2000);

            StringBuilder msg = new StringBuilder();
            msg.Append("Dear ");
            msg.Append("User,");
            msg.Append(Environment.NewLine);
            msg.Append("Your OTP for login to www.brahmasmi.in portal is :" + otpValue);
            //msg.Append(Environment.NewLine);
            msg.Append("Valid for 30 minutes. ");
           // msg.Append(Environment.NewLine);
            msg.Append("Please do not share this OTP.");
           // msg.Append(Environment.NewLine);
            //msg.Append(Environment.NewLine);
            msg.AppendLine("Regards,");
           // msg.AppendLine("\n");
            msg.AppendLine("Brahmasmi Team");
            string recipient = otpVerify.MobileNumber;

            string APIKey = "r0/FBFhRHR0-kjRFG13bkrqsfIJUKfCByvCDn3edoF";
           // string message = msg.ToString();
           string message = "Dear User, Your OTP is "+otpValue;
            //message = msg.ToString();
 
             string encodeMessage = HttpUtility.UrlEncode(message);

            using (var webClient = new WebClient())
            {
                byte[] response = webClient.UploadValues("https://api.textlocal.in/send", new NameValueCollection()
                    {
                        {"apikey",APIKey },
                        {"numbers",recipient },
                        { "message",encodeMessage},
                       // {"sender","Brahmasmi" }
                        {"sender","VYDIKA" }
                    });
                string results = System.Text.Encoding.UTF8.GetString(response);
                var jsonObject = JObject.Parse(results);


            }
            return otpValue;
        }
    }
}
