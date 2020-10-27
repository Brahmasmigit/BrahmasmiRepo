using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Logging;
using System.Reflection.Metadata;
using Microsoft.Extensions.Configuration;

namespace Brahmasmi.API
{
    public class Email
    {
        private  readonly ILogger<Email> logger;
        private readonly IConfiguration configuration;
        public  Email(ILogger<Email> _logger, IConfiguration _configuration)
        {
            logger = _logger;
            configuration = _configuration;
        }
        public  async Task SendEmail(string to, string toName, string subject, string body)
        {
            try
            {
                var emailSettingsSection = configuration.GetSection("EmailSettings");
                var apiKey = emailSettingsSection.GetValue<string>("APIKey");
                var from= emailSettingsSection.GetValue<string>("From"); 
                var fromName= emailSettingsSection.GetValue<string>("FromName");
                var client = new SendGridClient(apiKey);
                var mailfrom = new EmailAddress(from, fromName);
                var mailto = new EmailAddress(to, toName);
                var plainTextContent = body;
                var htmlContent = "<strong>" + body + "</strong>";
                var msg = MailHelper.CreateSingleEmail(mailfrom, mailto, subject, plainTextContent, htmlContent);
                var response = await client.SendEmailAsync(msg);
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Sending Email: {ex.ToString()}");
            }

        }
    }
}
