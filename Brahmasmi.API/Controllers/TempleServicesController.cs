using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Brahmasmi.Models;
using Brahmasmi.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Brahmasmi.API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TempleServicesController : ControllerBase
    {
        private readonly ILogger<TempleServicesController> logger;
        private readonly ITempleServiceRepository templeRepository;

        public TempleServicesController(ITempleServiceRepository _templeServiceRepository, ILogger<TempleServicesController> _logger)
        {
            templeRepository = _templeServiceRepository;
            logger = _logger;

        }

        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<int>> RegisterTemple()
        {
            try
            {
                TempleServicesAdminModel data = new TempleServicesAdminModel();

                var imageFile = Request.Form.Files[0];
                data.TempleImageFileName = imageFile.FileName;

                data.Action = Request.Form["Action"].ToString();
                data.TempleTypeId = Convert.ToInt32(Request.Form["TempleTypeId"].ToString());
                data.TempleId = Convert.ToInt32(Request.Form["TempleId"].ToString());
                data.TempleName = Request.Form["TempleName"].ToString();
                data.AboutTemple = Request.Form["AboutTemple"].ToString();
                data.TempleDescription = Request.Form["TempleDescription"].ToString();
                data.TempleTransport = Request.Form["TempleTransport"].ToString();
                data.ServicesTimings = JsonConvert.DeserializeObject<List<ServiceTimingsModel>>(Request.Form["ServicesTimings"]);

                data.AccommodationTimings = JsonConvert.DeserializeObject<List<AccommodationTimingsModel>>(Request.Form["AccommodationTimings"]);
                data.StateId = Convert.ToInt32(Request.Form["StateId"].ToString());
                data.CityId = Convert.ToInt32(Request.Form["CityId"].ToString());
                data.CustomerReviews = Request.Form["CustomerReviews"].ToString();

                var result = await Task.FromResult(templeRepository.AddTempleAdminData(imageFile, data));

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
        public async Task<ActionResult<int>> DeleteTemple(TempleServicesAdminModel data)
        {
            try
            {
                var result = await Task.FromResult(templeRepository.DeleteTemple(data));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }

        }

        [EnableCors("CorsPolicy")]
        [HttpGet("{TempleId}")]
        public async Task<ActionResult<List<Temple>>> GetTempleData(int TempleId)
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetTempleData(TempleId));
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
        public async Task<ActionResult<List<TempleType>>> GetTempleTypes()
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetTempleTypes());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpGet("{TempleId}")]
        public async Task<ActionResult<List<ServicesTimings>>> GetAllServicesTimings(int TempleId)
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetAllServicesTimings(TempleId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        [EnableCors("CorsPolicy")]
        [HttpGet("{TempleId}")]
        public async Task<ActionResult<List<AccommodationTimingsModel>>> GetAllAccommodationTimings(int TempleId)
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetAllAccommodationTimings(TempleId));
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
        public async Task<ActionResult<List<TemplesWithTypesList>>> GetTemplesWithTypesList()
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetTemplesWithTypesList());
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
        public async Task<ActionResult<List<TempleServiceUserRequest>>> GetTempleServiceUserRequest()
        {
            try
            {
                var result = await Task.FromResult(templeRepository.GetTempleServiceUserRequest());
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