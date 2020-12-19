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
        public async Task<ActionResult<Product>> GetAllProductsByCity(int cityID)
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
        [HttpPost]
        public async Task<ActionResult<Product>> GetAllProducts(ProductParamsModel productParamsModel)
        {
            try
            {
                var result = await Task.FromResult(productRepository.GetAllProducts(productParamsModel));
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
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<Product>> SaveProduct()
        {
            try
            {
                Product product = new Product();
                var imageFile = Request.Form.Files[0];
                product.ProductCategoryID = Convert.ToInt32(Request.Form["productCategoryID"]);
                product.ProductName = Request.Form["productName"].ToString();
                product.ProductPrice = Request.Form["ProductPrice"].ToString();
                product.ProductPrice = Request.Form["ProductPrice"].ToString();
                product.CityID = Convert.ToInt32(Request.Form["cityID"]);
               
                product.ProductShortDescription = Request.Form["productShortDescription"].ToString();
                product.ProductLongDescription = Request.Form["productLongDescription"].ToString();
                product.Action = Request.Form["action"].ToString();
                product.ProductKitItems = JsonConvert.DeserializeObject<List<ProductItems>>(Request.Form["kitItems"]);
                product.ProductkeyInsights = JsonConvert.DeserializeObject<List<ProductKeyInsights>>(Request.Form["keyInsights"]);



                if (product.Action == "Update")
                {
                    var productID = Convert.ToInt32(Request.Form["ProductID"]);
                    product.ProductID = productID;
                }
                else
                {
                    //  var serviceTypeID = DBNull.Value;
                    product.ProductID = 0;
                }

           
            



                var result = await Task.FromResult(productRepository.AddProduct(imageFile, product));
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
        public async Task<ActionResult<ItemCategories>> GetItemCategories()
        {
            try
            {
 
                var result = await Task.FromResult(productRepository.GetAllItemCategories());

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
        public async Task<ActionResult<Product>> GetProducts()
        {
            try
            {

                var result = await Task.FromResult(productRepository.GetProducts());

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
