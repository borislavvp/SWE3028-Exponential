using AlertsService.Data;
using AlertsService.Data.Models;
using AlertsService.Service.Interfaces;
using AlertsService.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace AlertsService.Service
{
    public class AlertsServiceLogic : IAlertsServiceLogic
    {
        public ApplicationDbContext DbContext { get; set; }
        public AlertsServiceLogic(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;
        }

        public List<string> GetDevicesForNotificationPerAlert(string stockSymbol, double alertValue)
        {
            if(alertValue < 0)
            {
                return DbContext.Alerts.Where(a => -(a.AlertValue) > alertValue && a.StockSymbol.Equals(stockSymbol)).Select(a => a.DeviceId).ToList();
            }
            return DbContext.Alerts.Where(a => a.AlertValue < alertValue && a.StockSymbol.Equals(stockSymbol)).Select(a => a.DeviceId).ToList();
        }

        public List<string> GetUniqueAlerts()
        {
            return DbContext.Alerts.Select(a => a.StockSymbol).Distinct().ToList();
        }

        public List<Alert> GetUserAlerts(ClaimsPrincipal principal)
        {
            return DbContext.Alerts
                .Where(a => a.UserEmail.Equals(principal.FindFirst(ClaimTypes.Email).Value))
                .ToList();
        }
        
        public List<Notification> GetUserNotifications(ClaimsPrincipal principal)
        {
            return DbContext.Notifications
                .Where(n => n.UserEmail.Equals(principal.FindFirst(ClaimTypes.Email).Value))
                .ToList();
        }

        public void SaveNotifications(NotificationsDTO notifications)
        {
            notifications.Devices.ForEach(d =>
            {
                var userEmail = DbContext.Alerts.Where(a => a.DeviceId.Equals(d)).First().UserEmail;

                DbContext.Notifications.Add(new Notification
                {
                    NotificationValue = notifications.NotificationValue,
                    NotificationImageURL = notifications.NotificationImageURL,
                    StockName = notifications.StockName,
                    StockSymbol = notifications.StockSymbol,
                    UserEmail = userEmail,
                    DateTIme = notifications.DateTIme
                });
            });
            DbContext.SaveChanges();
        }

        public void SetAlert(AlertDTO alert, ClaimsPrincipal principal)
        {
            DbContext.Alerts.Add(new Alert { 
                AlertValue = alert.AlertValue,
                StockName = alert.StockName,
                StockSymbol = alert.StockSymbol,
                DeviceId = alert.DeviceId,
                UserEmail = principal.FindFirst(ClaimTypes.Email).Value,
            });
            DbContext.SaveChanges();
        }
    }
}
