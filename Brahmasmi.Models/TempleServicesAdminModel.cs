using System;
using System.Collections.Generic;
using System.Text;

namespace Brahmasmi.Models
{
    public class TempleServicesAdminModel
    {
        public int TempleTypeId { get; set; }
        public int TempleId { get; set; }
        public string TempleName { get; set; }
        public string TempleDescription { get; set; }
        public int StateId { get; set; }
        public int CityId { get; set; }
        public List<ServiceTimingsModel> ServicesTimings { get; set; }
        public string CustomerReviews { get; set; }
        public string Action { get; set; }
        public byte[] TempleImage { get; set; }
        public string TempleImageFileName { get; set; }
    }

    public class ServiceTimingsModel
    {
        public int TempleId { get; set; }
        public string ServiceName { get; set; }
        public string ServiceTimings { get; set; }
        public double ServicePrice { get; set; }
        public int ServiceId { get; set; }
    }

    public class Temple
    {
        public int TempleTypeId { get; set; }
        public string TempleType { get; set; }
        public int TempleId { get; set; }
        public string TempleName { get; set; }
        public string TempleDescription { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public string CustomerReviews { get; set; }
        public byte[] TempleImage { get; set; }
        public string TempleImageFileName { get; set; }
    }

    public class ServicesTimings
    {
        public int TempleId { get; set; }
        public int ServiceId { get; set; }        
        public string ServiceName { get; set; }
        public string ServiceTimings { get; set; }
        public double ServicePrice { get; set; }        
    }

    public class TemplesWithTypesList
    {
        public int TempleId { get; set; }
        public int TempleTypeId { get; set; }
        public string TempleTypeName { get; set; }
        public string TempleName { get; set; }
        public string TempleCity { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
    }

    public class TempleType
    {
        public int TempleTypeId { get; set; }
        public string TempleTypeName { get; set; }
    }

    public class UserServiceRequestModel
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserMobileNo { get; set; }
        public int TempleId { get; set; }
        public string UserRequestQuery { get; set; }
    }

    public class TempleServiceUserRequest
    {
        public int ServiceId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserMobileNumber { get; set; }
        public int TempleId { get; set; }
        public string TempleName { get; set; }
        public string CityName { get; set; }
        public string StateName { get; set; }
        public string UserRequest { get; set; }
        public int Aging { get; set; }
    }
}
