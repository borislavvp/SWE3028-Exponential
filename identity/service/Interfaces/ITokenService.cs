using Identity.Data.Models;
using System.IdentityModel.Tokens.Jwt;

namespace Identity.Service.Interfaces
{
    public interface ITokenService
    {
        double GetTokenExpiration();
        string BuildToken(ApplicationUser user);
        JwtSecurityToken GetValidateToken(string token);

    }
}
