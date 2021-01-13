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
    public class VendorController : ControllerBase
    {
        private readonly ILogger<VendorController> logger;
        private readonly IVendorRepository vendorRepository;
        public VendorController(ILogger<VendorController> _logger, IVendorRepository _vendorRepository)
        {
            vendorRepository = _vendorRepository;
            logger = _logger;
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<VendorDataForMap>> GetVendors()
        {
            try
            {

                var result = await Task.FromResult(vendorRepository.GetAllVendor());
                //throw new Exception("Exception while fetching...");
                logger.LogInformation("end");

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
        public async Task<ActionResult<VendorDetails>> GetVendorDetail()
        {
            try
            {

                var result = await Task.FromResult(vendorRepository.GetVendorDetail());
                //throw new Exception("Exception while fetching...");
                logger.LogInformation("end");

                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{VendorID}")]
        public async Task<ActionResult<Vendor>> GetVendorData(int VendorID)
        {
            try
            {

                var result = await Task.FromResult(vendorRepository.GetVendorPreview(VendorID));
                //throw new Exception("Exception while fetching...");
                logger.LogInformation("end");

                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{VendorID}")]
        public async Task<ActionResult<Vendor>> GetVendorProfile(int VendorID)
        {
            try
            {

                var result = await Task.FromResult(vendorRepository.GetVendorProfile(VendorID));
                logger.LogInformation("end");

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
        public async Task<ActionResult<VendorApplicationNumber>> registerVendor(Vendor vendor)
        {
            try
            {

                var result = await Task.FromResult(vendorRepository.RegisterVendor(vendor));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at RegisterVendor: {ex}");
                return StatusCode(500, ex);
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<VendorOrder>> VendorPayment(VendorPayment vendor)
        {
            try
            {

                var result = await Task.FromResult(vendorRepository.VendorPayment(vendor));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at VendorPayment: {ex}");
                return StatusCode(500, ex);
            }
        }
     
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<Vendor>> UpdateVendor(Vendor vendor)
        {
            try
            {

                var result = await Task.FromResult(vendorRepository.UpdateVendor(vendor));
                //throw new Exception("Exception while fetching...");
                logger.LogInformation("end");
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
        public async Task<ActionResult<Vendor>> UploadPhoto()
        {
            try
            {
                var imageFile = Request.Form.Files[0];
                Vendor vendor = new Vendor();
                vendor.VendorID= Convert.ToInt32(Request.Form["vendorID"]);
                var result = await Task.FromResult(vendorRepository.UploadPhoto(imageFile, vendor));
                logger.LogInformation("end");
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
