using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Service.Interfaces
{
    public interface IResult
    {
        string FailureReason { get; }

        bool IsSuccess { get; }
    }

    public interface IResult<T> : IResult
    {
        T Data { get; }
    }
}
