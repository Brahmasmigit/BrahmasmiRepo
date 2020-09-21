using System;
using Brahmasmi.Models;
using System.Collections.Generic;

namespace Brahmasmi.Repository
{
    public interface IOrderDetailRepository
    {
        List<OrderDetail> GetOrderDetails(string invoiceno);
    }
}
