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
using Microsoft.Extensions.Configuration;

namespace Brahmasmi.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailRepository orderDetailRepository;
        private readonly ILogger<LoginController> logger;
        private readonly ILogger<Email> emaillogger;
        private readonly IConfiguration configuration;
        public OrderDetailController(IOrderDetailRepository _orderDetailRepository, ILogger<LoginController> _logger, ILogger<Email> _emaillogger, IConfiguration _configuration)
        {
            orderDetailRepository = _orderDetailRepository;
            logger = _logger;
            emaillogger = _emaillogger;
            configuration = _configuration;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<OrderDetail>> GetOrderDetails(string invoiceno)
        {
            try
            {
                var result = await Task.FromResult(orderDetailRepository.GetOrderDetails(invoiceno));
                //if (result.Count > 0)
                //{
                //    Email mail = new Email(emaillogger, configuration);
                //    string body = " Your order has been successfully placed. We will manually check your Payment and update the status.";
                //    var response = mail.SendEmail(result[0].EmailId, result[0].ServiceName, "Order is Successful", body);
                //}
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
