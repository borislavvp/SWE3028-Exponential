using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Service.DTO
{
    public class UserDTO
    {
        public string UserEmail { get; set; }
        public string Token { get; set; }
        public double TokenExpiration { get; set; }
    }
}
