using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Service.DTO
{
    public class UserLoginInputModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
