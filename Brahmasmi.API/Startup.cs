using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Brahmasmi.Repository;
using Dapper;
using Brahmasmi.Service;
using Brahmasmi.API.Extensions;
using Serilog.Core;

namespace Brahmasmi.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    );
            });
            services.AddControllers();
            services.AddDbContext<DataContext.AppContext>(options =>
                      options.UseSqlServer(
                          Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<ILoginRepository, LoginRepository>();
            services.AddScoped<IRegisterRepository, RegisterRepository>();
            services.AddScoped<IServiceTypeRepository, ServiceTypeRepository>();
            services.AddScoped<IServiceRepository, ServiceRepository>();
            services.AddScoped<IServiceDetailsRepository, ServiceDetailsRepository>();
            services.AddScoped<IUserBookingRepository, UserBookingRepository>();
            services.AddScoped<IUserDashboardRepository, UserDashboardRepository>();
            services.AddScoped<IVendorDashboardRepository, VendorDashboardRepository>();
            services.AddScoped<IBookingChangeStatusRepository, BookingChangeStatusRepository>();
            services.AddScoped<IAdminDashboardRepository, AdminDashboardRepository>();
            services.AddScoped<IPackageRepository, PackageRepository>();
            services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUtilitiesRepository, UtilitiesRepository>();
            services.AddScoped<IVendorEnquiryRepository,VendorEnquiryRepository>();
            services.AddScoped<IVendorRepository, VendorRepository>();
            services.AddScoped<IDapper, Dapperr>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
       
            //app.ConfigureExceptionHandler(logger);
            app.UseRouting();

            app.UseAuthorization();
            app.UseCors("CorsPolicy");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
           
            loggerFactory.AddFile("Logs/Brahmasmi-{Date}.txt");
        }
    }
}
