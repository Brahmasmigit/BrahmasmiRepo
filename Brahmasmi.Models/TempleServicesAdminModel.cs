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
    }

    public class ServiceTimingsModel
    {
        public int TempleId { get; set; }
        public string ServiceName { get; set; }
        public string ServiceTimings { get; set; }
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
    }

    public class ServicesTimings
    {
        public string ServiceName { get; set; }
        public string ServiceTimings { get; set; }
        public int ServiceId { get; set; }
        public int TempleId { get; set; }
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
        //public List<EndowmentTemple> EndowmentTemples { get; set; }
        //public List<NonEndowmentTemple> NonEndowmentTemples { get; set; }
    }

    public class TempleType
    {
        public int TempleTypeId { get; set; }
        public string TempleTypeName { get; set; }
    }

    //public class EndowmentTemple
    //{
    //    public int TempleId { get; set; }
    //    public int TempleTypeId { get; set; }
    //    public string TempleTypeName { get; set; }
    //    public string TempleName { get; set; }
    //}

    //public class NonEndowmentTemple
    //{
    //    public int TempleId { get; set; }
    //    public int TempleTypeId { get; set; }
    //    public string TempleTypeName { get; set; }
    //    public string TempleName { get; set; }
    //}
}
