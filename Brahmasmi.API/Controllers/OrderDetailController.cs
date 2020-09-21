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
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailRepository orderDetailRepository;
        private readonly ILogger<LoginController> logger;
        public OrderDetailController(IOrderDetailRepository _orderDetailRepository, ILogger<LoginController> _logger)
        {
            orderDetailRepository = _orderDetailRepository;
            logger = _logger;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<OrderDetail>> GetOrderDetails(string invoiceno)
        {
            try
            {
                var result = await Task.FromResult(orderDetailRepository.GetOrderDetails(invoiceno));
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
