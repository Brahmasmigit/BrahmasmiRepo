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
using Newtonsoft.Json.Linq;
using System.Net;
using System.Web;
using System.Collections.Specialized;
using Grpc.Core;
using System.Net.Mail;
using System.Net.Mime;

using System.IO;
using System.Text;


namespace Brahmasmi.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserBookingController : ControllerBase
    {
        private readonly IUserBookingRepository userBookingRepository;
        private readonly ILogger<UserBookingController> logger;
        private readonly ILogger<Email> emaillogger;
        private readonly ILogger<SMS> smslogger;
        private readonly IConfiguration configuration;
        public UserBookingController(IUserBookingRepository _userBookingRepository, ILogger<UserBookingController> _logger, ILogger<Email> _emaillogger, IConfiguration _configuration, ILogger<SMS> _smslogger)
        {
            userBookingRepository = _userBookingRepository;
            logger = _logger;
            emaillogger = _emaillogger;
            smslogger = _smslogger;
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
                        string username = userBooking[0].UserName; string Invoice = userBooking[0].InvoiceNo;
                        Email mail = new Email(emaillogger, configuration);
                     
                        //string body = " Your order has been successfully placed. We will manually check your Payment and update the status.";
                        string body = @"<body><div class='container' style='border:1px solid #f1f1f1;text-align:center'><img src='Images/email-image.png'><br><p>Greetings from Brahmasmi!!</p><br><p>Hello " + username + ", Thank you for choosing us. Your invoice number  " + Invoice + " is being processed by us. Our team will come back to you in a short time.</p></div></body>";
                        var response1 = mail.SendEmail(userBooking[0].EmailId, userBooking[0].UserName, "Order is Successful", body);
                        //LinkedResource imageResource1 = new LinkedResource(Server.MapPath("images/image.png"), "image/png");
                        //imageResource1.ContentId = "uniqueId1";
                        //imageResource1.TransferEncoding = TransferEncoding.Base64;

                        //// adding the imaged linked to htmlView...
                        //htmlView.LinkedResources.Add(imageResource1);

                        string recipient = userBooking[0].MobileNumber;
                        //string message = "Hello " + username + ", Greetings from Brahmasmi!! Thank you for choosing us. Your invoice number  " + Invoice + " is being processed by us. Our team will come back to you in a short time.";
                        string message = "Hello " + username + ", Your invoice no. " + Invoice + " is being processed by us. Our team will come back to you in a short time. Thank you for choosing Brahmasmi.";
                        string encodeMessage = HttpUtility.UrlEncode(message);
                        SMS sms = new SMS(smslogger);
                        var smsresponse = sms.SendSMS(recipient, encodeMessage);
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
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<string>> ChangeStatus(string response)
        {
            var result = await Task.FromResult(userBookingRepository.ChangeResponseStatus(response));
            return Ok(result);
        }

    }
}
