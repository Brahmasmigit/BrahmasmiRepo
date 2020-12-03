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
    public class VendorSearchController : ControllerBase
    {
        private readonly IVendorSearchRepository vendorSearchRepository;
        private readonly ILogger<VendorSearchController> logger;
        public VendorSearchController(IVendorSearchRepository _vendorSearchRepository, ILogger<VendorSearchController> _logger)
        {
            vendorSearchRepository = _vendorSearchRepository;
            logger = _logger;
        }

        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<VendorSearch>> SearchVendor(int cityid, string region )
        {
            try
            {
                var result = await Task.FromResult(vendorSearchRepository.SearchVendors(cityid, region));
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
