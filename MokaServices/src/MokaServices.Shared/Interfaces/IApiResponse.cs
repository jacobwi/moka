#region

using System.Net;

#endregion

namespace MokaServices.Shared.Interfaces;

public interface IApiResponse<T>
{
    HttpStatusCode StatusCode { get; set; }
    bool Success { get; set; }
    string Message { get; set; }
    T Data { get; set; }
}