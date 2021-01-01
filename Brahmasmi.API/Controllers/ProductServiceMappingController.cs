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
    public class ProductServiceMappingController : ControllerBase
    {

        private readonly ILogger<ProductServiceMappingController> logger;
        private readonly IProductServiceMappingRepository productServiceMappingRepository;
        public ProductServiceMappingController(ILogger<ProductServiceMappingController> _logger, IProductServiceMappingRepository _productServiceMappingRepository)
        {
            productServiceMappingRepository = _productServiceMappingRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<ProductServiceMapping>> AddProductServiceMapping(ProductServiceMapping mapping)
        {
            try
            {
                var result = await Task.FromResult(productServiceMappingRepository.AddProductServiceMapping(mapping));
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
