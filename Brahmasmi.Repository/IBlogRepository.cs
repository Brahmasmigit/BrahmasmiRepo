using System;
using Brahmasmi.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    public interface IBlogRepository
    {
        int AddUpdateBlog(IFormFile imageFile, Blog blog);
        int DeleteBlog(Blog blog);
        List<Blog> GetAllBlogs();
        Blog GetBlogDetails(int BlogID);

    }
}