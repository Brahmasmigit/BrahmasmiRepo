using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Brahmasmi.API
{
    public class SMS
    {
        private readonly ILogger<SMS> logger;
        public SMS(ILogger<SMS> _logger)
        {
            logger = _logger;
       
        }
        public async Task SendSMS(string recipient, string encodeMessage)
        {
            try
            {
                string APIKey = "r0/FBFhRHR0-kjRFG13bkrqsfIJUKfCByvCDn3edoF";
                using (var webClient = new WebClient())
                {
                    byte[] response = webClient.UploadValues("https://api.textlocal.in/send", new NameValueCollection()
                            {
                            {"apikey",APIKey },
                            {"numbers",recipient },
                            { "message",encodeMessage},
                         // {"sender","Brahmasmi" }
                            {"sender","VYDIKA" }
                            });
                    string results = System.Text.Encoding.UTF8.GetString(response);
                    var jsonObject = JObject.Parse(results);
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Exception at Sending SMS: {ex.ToString()}");
            }

        }
    }
    
}
