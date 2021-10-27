using Identity.Data.Models;
using Identity.Service.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Identity.Service.Interfaces
{
    public interface IIdentityService
    {
        Task<IResult<ApplicationUser>> GetUserByToken(JwtSecurityToken token);
        Task<IResult<string>> RegisterUser(UserRegistrationInputModel userModel);
        Task<IResult<string>> Login(UserLoginInputModel userLoginModel);
        Task<IResult<string>> RefreshToken(ClaimsPrincipal principal);
    }
}
