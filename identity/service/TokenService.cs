using Identity.Data.Models;
using Identity.Service.Interfaces;
using Identity.Service.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Service
{
    public class TokenService : ITokenService
    {
        private IConfiguration _configuration;
        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        private const double EXPIRY_DURATION_MINUTES = 30;

        public double GetTokenExpiration()
        {
            return EXPIRY_DURATION_MINUTES;
        }
        public string BuildToken(ApplicationUser user)
        {
            var claims = new[] {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, $@"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.MobilePhone, user.PhoneNumber),
                new Claim(ClaimTypes.NameIdentifier,
                Guid.NewGuid().ToString())
             };

            var issuer = AppSettingsHelper.TOKEN_ISSUER(_configuration);
            var key = AppSettingsHelper.TOKEN_SECRET(_configuration);
            var audience = AppSettingsHelper.TOKEN_AUDIENCE(_configuration);

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(issuer, audience, claims,
                expires: DateTime.Now.AddMinutes(EXPIRY_DURATION_MINUTES), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
        public JwtSecurityToken GetValidateToken(string token)
        {
            var issuer = AppSettingsHelper.TOKEN_ISSUER(_configuration);
            var key = AppSettingsHelper.TOKEN_SECRET(_configuration);
            var audience = AppSettingsHelper.TOKEN_AUDIENCE(_configuration);

            var mySecret = Encoding.UTF8.GetBytes(key);
            var mySecurityKey = new SymmetricSecurityKey(mySecret);
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token,
                new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = mySecurityKey,
                }, out SecurityToken validatedToken);

                return (JwtSecurityToken)validatedToken;
            }
            catch
            {
                return null;
            }
        }
    }
}
