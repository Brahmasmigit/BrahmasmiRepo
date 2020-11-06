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
        public MeetingController(IUtilitiesRepository _utilitiesRepository, ILogger<MeetingController> _logger)
        {
            utilitiesRepository = _utilitiesRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<Meeting>> ScheduleMeeting(Meeting meeting)
        {
            var result = await Task.FromResult(utilitiesRepository.ScheduleMeeting(meeting));
            return Ok(result);

        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<Meeting>> GetMeetingDetails()
        {
            var result = await Task.FromResult(utilitiesRepository.GetMeetingDetails());
            return Ok(result);

        }
    }
}
