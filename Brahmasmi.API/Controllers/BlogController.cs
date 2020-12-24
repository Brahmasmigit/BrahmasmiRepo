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
    public class BlogController : ControllerBase
    {
        private readonly IBlogRepository blogRepository;
        private readonly ILogger<LoginController> logger;
        public BlogController(IBlogRepository _blogRepository, ILogger<LoginController> _logger)
        {
            blogRepository = _blogRepository;
            logger = _logger;
        }



        [EnableCors("CorsPolicy")]
        [HttpGet]
        public async Task<ActionResult<Blog>> GetAllBlogs()
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(blogRepository.GetAllBlogs());
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
        [HttpGet("{BlogID}")]
        public async Task<ActionResult<Blog>> GetBlogDetails(int BlogID)
        {
            try
            {
                //logger.LogInformation(stateid.ToString());
                var result = await Task.FromResult(blogRepository.GetBlogDetails(BlogID));
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
        [HttpPost]
        public async Task<ActionResult<Blog>> DeleteBlog(Blog blog)
        {
            try
            {
                var result = await Task.FromResult(blogRepository.DeleteBlog(blog));
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
        public async Task<ActionResult<Blog>> SaveBlog()
        {
            try
            {
                var imageFile = Request.Form.Files[0];
                var blogTitle = Request.Form["blogTitle"].ToString();

                var action = Request.Form["action"].ToString();
                Blog blog = new Blog();
                if (action == "Update")
                {
                    var blogID = Convert.ToInt32(Request.Form["blogID"]);
                    blog.BlogID = blogID;
                }
                else
                {
                    //  var serviceTypeID = DBNull.Value;
                    blog.BlogID = 0;
                }

                blog.BlogTitle = blogTitle;
                blog.CreatedBy = Request.Form["CreatedBy"].ToString();
                blog.Description = Request.Form["Description"].ToString();
                blog.Action = action;
               

                var result = await Task.FromResult(blogRepository.AddUpdateBlog(imageFile, blog));
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

