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
    public class StoreStockController : ControllerBase
    {
        private readonly ILogger<StoreStockController> logger;
        private readonly IStoreStockRepository storeStockRepository;
        public StoreStockController(ILogger<StoreStockController> _logger, IStoreStockRepository _storeStockRepository)
        {
            storeStockRepository = _storeStockRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<StoreStock>> StockEntry(StoreStock stock)
        {
            try
            {
                var result = await Task.FromResult(storeStockRepository.StockEntry(stock));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, ex);
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{storeid}")]
        public async Task<ActionResult<StoreStock>> GetStockDetails(int storeid)
        {
            try
            {
                var result = await Task.FromResult(storeStockRepository.GetStockDetails(storeid));
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
