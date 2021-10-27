using Identity.Service.DTO;
using Identity.Service.Interfaces;
using Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Identity.API.Controllers
{
    [ApiController]
    [Route("api/identity")]
    public class IdentityController : ControllerBase
    {

        private readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost]
        [Route("registration")]
        public async Task<ActionResult >Register(UserRegistrationInputModel model)
        {
            try
            {
                IResult<string> res = await _identityService.RegisterUser(model);
                if (res.IsSuccess)
                {
                    return Ok(res.Data);
                }
                else
                {
                    return BadRequest(res.FailureReason);
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(UserLoginInputModel model)
        {
            try
            {
                IResult<string> res = await _identityService.Login(model);
                if (res.IsSuccess)
                {
                    return Ok(res.Data);
                }
                else
                {
                    return BadRequest(res.FailureReason);
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("token/refresh")]
        public async Task<ActionResult> RefreshToken()
        {
            try
            {
                IResult<string> res = await _identityService.RefreshToken(HttpContext.User);
                if (res.IsSuccess)
                {
                    return Ok(res.Data);
                }
                else
                {
                    return BadRequest(res.FailureReason);
                }
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
