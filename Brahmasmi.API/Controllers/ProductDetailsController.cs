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
    public class ProductDetailsController : ControllerBase
    {
        private readonly IProductDetailsRepository productDetailsRepository;
        private readonly ILogger<ProductDetailsController> logger;
        public ProductDetailsController(IProductDetailsRepository _productDetailsRepository, ILogger<ProductDetailsController> _logger)
        {
            productDetailsRepository = _productDetailsRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{ProductID}")]
        public async Task<ActionResult<ProductDetails>> GetProductDetails(int ProductID)
        {
            try
            {
                var result = await Task.FromResult(productDetailsRepository.GetProductDetails(ProductID));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{ProductID}")]
        public async Task<ActionResult<ProductKeyInsights>> GetProductKeyInsights(int ProductID)
        {
            try
            {
                var result = await Task.FromResult(productDetailsRepository.GetProductKeyInsights(ProductID));
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
