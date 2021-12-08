using Identity.Data.Models;
using Identity.Service.DTO;
using Identity.Service.Interfaces;
using Identity.Service.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Identity.Services
{
    public class IdentityService: IIdentityService
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityService(ITokenService tokenService, UserManager<ApplicationUser> userManager)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        public async Task<IResult<ApplicationUser>> GetUserByToken(JwtSecurityToken token)
        {
            var user = await _userManager.FindByEmailAsync(token.Claims.First(x => x.Type == ClaimTypes.Email).Value);
            if(user != null)
            {
                return Result<ApplicationUser>.Success(user);
            }
            else
            {
                return Result<ApplicationUser>.Fail("Invalid token!");
            }
        }
        public async Task<IResult<UserDTO>> RegisterUser(UserRegistrationInputModel userModel)
        {
            var user = new ApplicationUser
            {
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                PhoneNumber = userModel.PhoneNumber,
                Subject = Guid.NewGuid().ToString(),
                UserName = userModel.Email
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);
            // If creation of the user fails return a failure
            if (!result.Succeeded)
                return Result<UserDTO>.Fail(result.Errors.First().ToString());
            // Else try to sign in the user and return the result
            else
                return Result<UserDTO>.Success(new UserDTO
                {
                    UserEmail = user.Email,
                    Token = _tokenService.BuildToken(user),
                    TokenExpiration = _tokenService.GetTokenExpiration()
                }); ;

        }
        public async Task<IResult<UserDTO>> Login(UserLoginInputModel userLoginModel)
        {
            var user = await _userManager.FindByEmailAsync(userLoginModel.Email);

            if (user == null)
            {
                return Result<UserDTO>.Fail("There is no user in the system with that email!");
            }


            if (await _userManager.CheckPasswordAsync(user, userLoginModel.Password))
            {
                return Result<UserDTO>.Success(new UserDTO
                {
                    UserEmail = user.Email,
                    Token = _tokenService.BuildToken(user),
                    TokenExpiration = _tokenService.GetTokenExpiration()
                });
            }
            else
            {
                return Result<UserDTO>.Fail("Invalid password!");
            }

        }
        public async Task<IResult<UserDTO>> RefreshToken(ClaimsPrincipal principal)
        {
            var user = await _userManager.FindByEmailAsync(principal.FindFirstValue(ClaimTypes.Email));

            if (user == null)
            {
                return Result<UserDTO>.Fail("There is no user in the system with that email!");
            }
            else
            {
                return Result<UserDTO>.Success(new UserDTO
                {
                    UserEmail = user.Email,
                    Token = _tokenService.BuildToken(user),
                    TokenExpiration = _tokenService.GetTokenExpiration()
                });
            }
        }
    }
}
