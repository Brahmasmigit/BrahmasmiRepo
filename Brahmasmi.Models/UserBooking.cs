﻿using System;
using System.Collections.Generic;

namespace Brahmasmi.Models
{
    public class UserBooking
    {
        public int UserId { get; set; }
        public string BookingDate { get; set; }
        public int VendorId { get; set; }
        public string BookingType { get; set; }
        public int ServiceTypeId { get; set; }
        public int ServiceId { get; set; }
        public int BookingStatusId { get; set; }
        public string BookingLocation { get; set; }
        public string BookingTime { get; set; }
        public string ReviewComments { get; set; }
        public int PackageId { get; set; }
        public int LanguageId { get; set; }
        public string Description { get; set; }

        public string PackageName { get; set; }
        public int CityId { get; set; }

        public int NewCItyId { get; set; }

        public string UserName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public string IsDifferentLocation { get; set; }
        public string PinCode { get; set; }        

        public string NewPinCode { get; set; }
        public string Address { get; set; }
        public string NewAddress { get; set; }

        public string OrderNO { get; set; }
        public string InvoiceNo { get; set; }
        public int PaymentMode { get; set; }
        public int PaymentStatus { get; set; }
        public int Total { get; set; }
        public List<VendorData> VendorList { get; set; }
        public int ProductID { get; set; }
        public decimal ItemPrice { get; set; }
   


    }
    public class Orders
    {
        public string OrderNO { get; set; }

        public string InvoiceNo { get; set; }
        public int Result { get; set; }
        public string EncryptedResult { get; set; }
    }

    public class VendorData
    {
        public int VendorID { get; set; }
    }
}

