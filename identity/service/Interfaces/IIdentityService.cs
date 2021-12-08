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
        Task<IResult<UserDTO>> RegisterUser(UserRegistrationInputModel userModel);
        Task<IResult<UserDTO>> Login(UserLoginInputModel userLoginModel);
        Task<IResult<UserDTO>> RefreshToken(ClaimsPrincipal principal);
    }
}
