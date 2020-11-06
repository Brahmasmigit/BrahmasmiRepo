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
    public class StoreController : ControllerBase
    {
        private readonly ILogger<StoreController> logger;
        private readonly IStoreRepository storeRepository;
        public StoreController(ILogger<StoreController> _logger, IStoreRepository _storeRepository)
        {
            storeRepository = _storeRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<Store>> StoreRegistration(Store store)
        {
            try
            {
                var result = await Task.FromResult(storeRepository.StoreRegistration(store));
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
