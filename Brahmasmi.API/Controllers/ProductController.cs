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
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository productRepository;
        private readonly ILogger<ProductController> logger;
        public ProductController(IProductRepository _productRepository, ILogger<ProductController> _logger)
        {
            productRepository = _productRepository;
            logger = _logger;
        }

        [EnableCors("CorsPolicy")]
        [HttpGet("{CityID}")]
        public async Task<ActionResult<Product>> GetAllProducts(int cityID)
        {
            try
            {
                var result = await Task.FromResult(productRepository.GetAllProducts(cityID));
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
        public async Task<ActionResult<Product>> GetProduct(int ProductID)
        {
            try
            {
                var result = await Task.FromResult(productRepository.GetProduct(ProductID));
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
