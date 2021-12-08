using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlertsService.Data.Models
{
    public class Notification
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string StockName { get; set; }
        [Required]
        public string StockSymbol { get; set; }
        [Required]
        public float NotificationValue { get; set; }
        [Required]
        public string NotificationImageURL { get; set; }
        [Required]
        public string UserEmail { get; set; }
        [Required]
        public string DateTIme { get; set; }
    }
}
