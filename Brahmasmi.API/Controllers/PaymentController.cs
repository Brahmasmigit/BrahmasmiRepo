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
using Razorpay.Api;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Brahmasmi.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ILogger<PaymentController> logger;
        private readonly IConfiguration configuration;
        private RazorpayClient _razorpayClient;
        public PaymentController(ILogger<PaymentController> _logger, IConfiguration _configuration)
        {
            logger = _logger;
            configuration = _configuration;
            var emailSettingsSection = configuration.GetSection("PaymentSettings");
            string key = emailSettingsSection.GetValue<string>("Key");
            string secret = emailSettingsSection.GetValue<string>("Secret");
            _razorpayClient = new RazorpayClient(key, secret);
        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<PaymentModel>> InitializePayment(PaymentModel payment)
        {
            try
            {
                var emailSettingsSection = configuration.GetSection("PaymentSettings");
                string receipt = emailSettingsSection.GetValue<string>("receipt");
                var options = new Dictionary<string, object>
                {
                    { "amount", payment.Amount },
                    { "currency", payment.Currency },
                    { "receipt",  receipt }
                };

                var order = await Task.FromResult(_razorpayClient.Order.Create(options));
                var orderId = order["id"].ToString();
                //var orderJson = order.Attributes.ToString();
                payment.orderId = orderId;
                return Ok(payment);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Login Method: {ex.InnerException}");
                return StatusCode(500, ex);
            }

        }
        [EnableCors("CorsPolicy")]
        [HttpPost]
        public async Task<ActionResult<ConfirmPayment>> ConfirmPayment(ConfirmPayment confirmPayment)
        {
            try
            {
                var attributes = new Dictionary<string, string>
                {
                { "razorpay_payment_id", confirmPayment.RazorPaymentId },
                { "razorpay_order_id", confirmPayment.RazorOrderId },
                { "razorpay_signature", confirmPayment.RazorSignature }
                };
                var payload = confirmPayment.RazorOrderId + '|' + confirmPayment.RazorPaymentId;
                var emailSettingsSection = configuration.GetSection("PaymentSettings");
                string secret = emailSettingsSection.GetValue<string>("Secret");
                Utils.verifyWebhookSignature(payload, confirmPayment.RazorSignature, secret);
                var order = _razorpayClient.Order.Fetch(confirmPayment.RazorOrderId);
                var payment = await Task.FromResult(_razorpayClient.Payment.Fetch(confirmPayment.RazorPaymentId));
                if (payment["status"] == "captured")
                {
                    confirmPayment.IsPaymentSuccess = true;
                }
                else
                {
                    confirmPayment.IsPaymentSuccess = false;
                }
                return Ok(confirmPayment);
            }
            catch (Exception ex)
            {
                // return StatusCode(StatusCodes.Status500InternalServerError);
                logger.LogError($"Exception at Login Method: {ex.InnerException}");
                return StatusCode(500, ex);
            }
        }
    }

}
