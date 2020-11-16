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
    public class VirtualVideoCategoryController : ControllerBase
    {
        private readonly IVirtualVideoCategoryRepository virtualVideoCategoryRepository;
        private readonly ILogger<VirtualVideoCategoryController> logger;
        public VirtualVideoCategoryController(IVirtualVideoCategoryRepository _virtualVideoCategoryRepository, ILogger<VirtualVideoCategoryController> _logger)
        {
            virtualVideoCategoryRepository = _virtualVideoCategoryRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<VirtualVideoCategory>> GetVirtualVideoCategories()
        {
            try
            {
                var result = await Task.FromResult(virtualVideoCategoryRepository.GetVirtualVideoCategory());
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
