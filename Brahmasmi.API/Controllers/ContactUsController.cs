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
    public class ContactUsController : ControllerBase
    {
        private readonly ILogger<ContactUsController> logger;
        private readonly IContactUsRepository ContactRepository;
        public ContactUsController(ILogger<ContactUsController> _logger, IContactUsRepository _ContactUsRepository)
        {
            ContactRepository = _ContactUsRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<ContactUs>> ContactToWebsite(ContactUs contact)
        {
            try
            {
                var result = await Task.FromResult(ContactRepository.Contact(contact));
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