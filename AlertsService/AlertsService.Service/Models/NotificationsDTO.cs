using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlertsService.Service.Models
{
    public class NotificationsDTO
    {
        public List<string> Devices { get; set; }
        public string StockName { get; set; }
        public string StockSymbol { get; set; }
        public float NotificationValue { get; set; }
        public string NotificationImageURL { get; set; }
        public string DateTIme { get; set; }
    }
}
