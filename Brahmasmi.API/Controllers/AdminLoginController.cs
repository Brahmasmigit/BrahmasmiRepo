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

namespace Brahmasmi.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminLoginController : ControllerBase
    {
        private readonly IAdminLoginRepository adminLoginRepository;
        private readonly ILogger<AdminLoginController> logger;
        public AdminLoginController(IAdminLoginRepository _adminLoginRepository, ILogger<AdminLoginController> _logger)
        {
            adminLoginRepository = _adminLoginRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<AdminLogin>> AdminExist(AdminLogin adminLogin)
        {
            try
            {
                var result = await Task.FromResult(adminLoginRepository.CheckAdminExist(adminLogin));
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
