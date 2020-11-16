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
    public class StoreDashboardController : ControllerBase
    {
        private readonly ILogger<StoreDashboardController> logger;
        private readonly IStoreDashboardRepository storeDashboardRepository;
        public StoreDashboardController(ILogger<StoreDashboardController> _logger, IStoreDashboardRepository _storeDashboardRepository)
        {
            storeDashboardRepository = _storeDashboardRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<StoreDashboard>> GetStoreOrderdetails(int storeid,string storetype, string calendartype)
        {
            try
            {
                var result = await Task.FromResult(storeDashboardRepository.GetStoreOrderDetails(storeid, storetype, calendartype));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, ex);
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<BookingChangeStatus>> ChangeBookingStatus(BookingChangeStatus booking)
        {
            try
            {
                var result = await Task.FromResult(storeDashboardRepository.BookingChangeStatus(booking));
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
