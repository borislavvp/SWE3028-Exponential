using AlertsService.Data.Models;
using AlertsService.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AlertsService.Service.Interfaces
{
    public interface IAlertsServiceLogic
    {
        void SetAlert(AlertDTO alert, ClaimsPrincipal principal);
        List<string> GetDevicesForNotificationPerAlert(string stockSymbol, double alertValue);
        List<string> GetUniqueAlerts();
        void SaveNotifications(NotificationsDTO notifications);
        List<Notification> GetUserNotifications(ClaimsPrincipal principal);
        List<Alert> GetUserAlerts(ClaimsPrincipal principal);
    }
}
