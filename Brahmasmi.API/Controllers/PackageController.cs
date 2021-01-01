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
    public class PackageController : ControllerBase
    {
        private readonly IPackageRepository packageRepository;
        private readonly ILogger<LoginController> logger;
        public PackageController(IPackageRepository _packageRepository, ILogger<LoginController> _logger)
        {
            packageRepository = _packageRepository;
            logger = _logger;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet("{serviceid}")]
        public async Task<ActionResult<Package>> GetUserPackages(int serviceid)
        {
            try
            {
                var result = await Task.FromResult(packageRepository.GetUserPackages(serviceid));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{serviceid}")]
        public async Task<ActionResult<Package>> GetUserPackageList(int serviceid)
        {
            try
            {
                var result = await Task.FromResult(packageRepository.GetUserPackageList(serviceid));
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
        public async Task<ActionResult<Package>> GetPackagePrice(ServicePackage servicePackage)
        {
            try
            {
                var result = await Task.FromResult(packageRepository.GetPackagePrice(servicePackage));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<Package>> GetPackages()
        {
            try
            {
                var result = await Task.FromResult(packageRepository.GetServicePackages());
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
