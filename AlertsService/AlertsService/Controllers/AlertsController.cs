using AlertsService.Data.Models;
using AlertsService.Service;
using AlertsService.Service.Interfaces;
using AlertsService.Service.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlertsService.Controllers
{
    [ApiController]
    [Route("alerts")]
    public class AlertsController : ControllerBase
    {
        private readonly IAlertsServiceLogic _service;

        public AlertsController(IAlertsServiceLogic service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        [Route("all")]
        public ActionResult<List<Alert>> GetUserAlerts()
        {
            try
            {
                var res = _service.GetUserAlerts(HttpContext.User);
                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }  
        
        [HttpGet]
        [Authorize]
        [Route("notifications")]
        public ActionResult<List<string>> GetUserNotifications()
        {
            try
            {
                var res = _service.GetUserNotifications(HttpContext.User);
                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("set")]
        public ActionResult SetAlert(AlertDTO alert)
        {
            try
            {
                _service.SetAlert(alert, HttpContext.User);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        [HttpPost]
        [Route("save/notifications")]
        public ActionResult PersistNotifications(NotificationsDTO notifications)
        {
            try
            {
                _service.SaveNotifications(notifications);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        
        [HttpGet]
        [Route("unique")]
        public ActionResult<List<string>> GetUniqueAlerts()
        {
            try
            {
                var res = _service.GetUniqueAlerts();
                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        
        [HttpGet]
        [Route("{stockSymbol}/{alertValue=alertValue}")]
        public ActionResult<List<string>> GetDevicesForNotificationPerAlert([FromRoute] string stockSymbol, [FromQuery] double alertValue)
        {
            try
            {
                var res = _service.GetDevicesForNotificationPerAlert(stockSymbol, alertValue);
                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
