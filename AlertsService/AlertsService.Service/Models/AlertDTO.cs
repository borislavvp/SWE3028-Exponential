using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlertsService.Service.Models
{
    public class AlertDTO
    {
        public string StockName { get; set; }
        public string StockSymbol { get; set; }
        public string DeviceId { get; set; }
        public float AlertValue{ get; set; }
    }
}
