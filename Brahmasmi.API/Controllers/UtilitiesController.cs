﻿using System;
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
    public class UtilitiesController : ControllerBase
    {
        private readonly IUtilitiesRepository utilitiesRepository;
        private readonly ILogger<UtilitiesController> logger;
        public UtilitiesController(IUtilitiesRepository _utilitiesRepository, ILogger<UtilitiesController> _logger)
        {
            utilitiesRepository = _utilitiesRepository;
            logger = _logger;
        }


        [EnableCors("CorsPolicy")]
        [HttpGet("{StateID}")]
        public async Task<ActionResult<City>> GetCity(int stateid)
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.Cities(stateid));
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
        public async Task<ActionResult<Certifications>> GetCertification()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(utilitiesRepository.GetCertifications());
                //throw new Exception("Exception while fetching...");
                // logger.LogInformation("end");

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
        public async Task<ActionResult<SocialNetwork>> GetSocialNetworks()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(utilitiesRepository.GetSocialNetwork());
                //throw new Exception("Exception while fetching...");
                // logger.LogInformation("end");

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
        public async Task<ActionResult<Country>> GetCountry()
        {
            try
            {

                var result = await Task.FromResult(utilitiesRepository.GetCountry());
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
        public async Task<ActionResult<State>> GetStates()
        {
            try
            {

                var result = await Task.FromResult(utilitiesRepository.GetState());
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
        [HttpGet("{CountryID}")]
        public async Task<ActionResult<State>> GetAllState(int CountryID)
        {
            try
            {

                var result = await Task.FromResult(utilitiesRepository.GetStates(CountryID));
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
        public async Task<ActionResult<Title>> GetTitle()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(utilitiesRepository.GetTitle());
                //throw new Exception("Exception while fetching...");
                // logger.LogInformation("end");

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
        public async Task<ActionResult<City>> GetAllCities()
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.AllCities());
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
        public async Task<ActionResult<Patient>> SavePatient(Patient patient)
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.SavePatient(patient));
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
        public async Task<ActionResult<Patient>> GetPatientData()
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.GetPatientData());

                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{cityId}")]
        public async Task<ActionResult<AdminVendor>> GetVendor(int cityId)
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.GetVendor(cityId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, ex);
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<Language>> GetAllLanguages()
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.GetLanguages());
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet("{cityId}")]
        public async Task<ActionResult<StoreVendor>> GetStores(int cityId)
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.GetStores(cityId));
                return Ok(result);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex}");
                return StatusCode(500, ex);
            }
        }
        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<Education>> GetAllEducations()
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.GetEducations());
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
        public async Task<ActionResult<IndustryTypes>> GetIndustryTypes()
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.GetIndustryTypes());
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
        public async Task<ActionResult<VirtualPlatform>> GetVirtualPlatforms()
        {
            try
            {
                var result = await Task.FromResult(utilitiesRepository.GetVirtualPlatforms());
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
