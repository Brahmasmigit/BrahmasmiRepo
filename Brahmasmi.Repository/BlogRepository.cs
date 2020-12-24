using System;
using System.Collections.Generic;
using System.Text;
using Brahmasmi.Models;
using Brahmasmi.Service;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;

namespace Brahmasmi.Repository
{
    [EnableCors("CorsPolicy")]
    public class BlogRepository : IBlogRepository
    {
        private readonly IDapper dapper;
        public BlogRepository(IDapper _dapper)
        {
            dapper = _dapper;
        }

        public List<Blog> GetAllBlogs()
        {
            var dbParam = new DynamicParameters();
            var result = dapper.GetAll<Blog>("[dbo].[SP_Get_AllBlogs]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }

        public Blog GetBlogDetails(int BlogID)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("BlogID", BlogID, DbType.Int32);
            var result = dapper.Get<Blog>("[dbo].[SP_Get_BlogDetails]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int AddUpdateBlog(IFormFile imageFile, Blog blog)
        {
            var dbParam = new DynamicParameters();
            // var uploadFile = Request.Form.Files[0];
            var uploadFile = imageFile;
            long length = uploadFile.Length;
            byte[] bytes = new byte[length];
            var reader = uploadFile.OpenReadStream();
            reader.ReadAsync(bytes, 0, Convert.ToInt32(length));
            reader.Close();
            dbParam.Add("BlogID", blog.BlogID, DbType.Int32);
            dbParam.Add("BlogTitle", blog.BlogTitle, DbType.String);
            dbParam.Add("BlogImage", bytes, DbType.Binary);            
            dbParam.Add("Description", blog.Description, DbType.String);
            dbParam.Add("CreatedBy", blog.CreatedBy, DbType.String);
            dbParam.Add("Action", blog.Action, DbType.String);       
            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_InsertUpdate_Blog]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
        public int DeleteBlog(Blog blog)
        {
            var dbParam = new DynamicParameters();
            dbParam.Add("BlogID", blog.BlogID, DbType.Int32);

            dbParam.Add("result", null, DbType.Int32, ParameterDirection.ReturnValue);
            var result = dapper.Execute("[dbo].[SP_Delete_Blog]"
                 , dbParam,
                 commandType: CommandType.StoredProcedure);
            return result;

        }
    }
}
