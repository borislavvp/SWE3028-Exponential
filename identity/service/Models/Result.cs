using Identity.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Service.Models
{
    public sealed class Result : IResult
    {
        public bool IsSuccess => FailureReason == null;
        public string FailureReason { get; }
        public static Result Success { get; } = new Result();

        public static implicit operator bool(Result result)
        {
            return result.IsSuccess;
        }
        private Result() { }

        private Result(string failureReason)
        {
            FailureReason = failureReason;
        }
        public static Result Fail(string reason)
        {
            return new Result(reason);
        }
    }

    public sealed class Result<T> : IResult<T>
    {
        public bool IsSuccess => FailureReason == null;
        public string FailureReason { get; }

        public T Data { get; set; }

        public static implicit operator bool(Result<T> result)
        {
            return result.IsSuccess;
        }
        private Result(string failureReason)
        {
            FailureReason = failureReason;
        }
        public static Result<T> Fail(string reason)
        {
            return new Result<T>(reason);
        }
        private Result(T data)
        {
            Data = data;
        }
        public static Result<T> Success(T data)
        {
            return new Result<T>(data);
        }
    }
}
