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
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Brahmasmi.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IUtilitiesRepository utilitiesRepository;
        private readonly ILogger<MeetingController> logger;
        string apiKey = "";
        string apiSecret = "";
        static readonly char[] padding = { '=' };
        string role = "1";
        public MeetingController(IUtilitiesRepository _utilitiesRepository, ILogger<MeetingController> _logger)
        {
            utilitiesRepository = _utilitiesRepository;
            logger = _logger;
     
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<Meeting>> ScheduleMeeting(Meeting meeting)
        {
            var resultCredentials = await Task.FromResult(utilitiesRepository.GetMeetingCredentials());
            apiKey = resultCredentials.APIKey;
            apiSecret= resultCredentials.APISecret;
            String ts = (ToTimestamp(DateTime.UtcNow.ToUniversalTime()) - 30000).ToString();
            string token = GenerateToken(apiKey, apiSecret, meeting.MeetingId, ts, role);
            meeting.Signature = token;
            var result = await Task.FromResult(utilitiesRepository.ScheduleMeeting(meeting));
            return Ok(result);

        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{bookingid}")]
        public async Task<ActionResult<Meeting>> GetMeetingDetails(int bookingid)
        {
            var result = await Task.FromResult(utilitiesRepository.GetMeetingDetails(bookingid));
            return Ok(result);

        }
        public static long ToTimestamp(DateTime value)
        {
            long epoch = (value.Ticks - 621355968000000000) / 10000;
            return epoch;
        }
        public static string GenerateToken(string apiKey, string apiSecret, string meetingNumber, string ts, string role)
        {
            string message = String.Format("{0}{1}{2}{3}", apiKey, meetingNumber, ts, role);
            apiSecret = apiSecret ?? "";
            var encoding = new System.Text.ASCIIEncoding();
            byte[] keyByte = encoding.GetBytes(apiSecret);
            byte[] messageBytesTest = encoding.GetBytes(message);
            string msgHashPreHmac = System.Convert.ToBase64String(messageBytesTest);
            byte[] messageBytes = encoding.GetBytes(msgHashPreHmac);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                string msgHash = System.Convert.ToBase64String(hashmessage);
                string token = String.Format("{0}.{1}.{2}.{3}.{4}", apiKey, meetingNumber, ts, role, msgHash);
                var tokenBytes = System.Text.Encoding.UTF8.GetBytes(token);
                return System.Convert.ToBase64String(tokenBytes).TrimEnd(padding);
            }
        }

    }

}

