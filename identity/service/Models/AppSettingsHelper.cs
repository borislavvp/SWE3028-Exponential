using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Service.Models
{
    public class AppSettingsHelper
    {
        public static readonly Func<IConfiguration, string> TOKEN_ISSUER = (IConfiguration conf) => loadSetting(conf, "Jwt:Issuer");
        public static readonly Func<IConfiguration, string> TOKEN_SECRET = (IConfiguration conf) => loadSetting(conf, "Jwt:Secret");
        public static readonly Func<IConfiguration, string> TOKEN_AUDIENCE = (IConfiguration conf) => loadSetting(conf, "Jwt:Audience");

        private static string loadSetting(IConfiguration configuration, string key, string fallback = null)
        {
            try
            {
                var value = configuration[key] ?? fallback;

                if (value == null)
                {
                    throw new FormatException($"AppSetting: {key} is empty");
                }
                return value;
            }
            catch (FormatException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Exception($"AppSetting: {key} is missing", ex);

            }
        }
    }
}
