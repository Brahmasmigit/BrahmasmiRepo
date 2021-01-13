using System;
using System.Collections.Generic;

namespace Brahmasmi.Models
{
    public class TempleUserBooking1
    {
        public int UserId { get; set; }
        //public string BookingDate { get; set; }
        public int VendorId { get; set; }
        //public string BookingType { get; set; }
        //public int ServiceTypeId { get; set; }
        //public int ServiceId { get; set; }
        public int TempleId { get; set; }
        public int BookingStatusId { get; set; }
        public string BookingLocation { get; set; }
        //public string BookingTime { get; set; }
        public string ReviewComments { get; set; }
        public int PackageId { get; set; }

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
        public string UserQuery { get; set; }
        public int RoomTypeId { get; set; }
        public string RoomType { get; set; }
        public int RoomPrice { get; set; }
        public int DarshanTypeId { get; set; }
        public string DarshanType { get; set; }
        public int DarshanPrice { get; set; }
        public List<UserServiceDetails> ServiceDetails { get; set; }
    }

    public class TempleUserBooking
    {
        public int UserId { get; set; }
        public int TempleId { get; set; }
        public int BookingStatusId { get; set; }
        public string BookingLocation { get; set; }
        public int CityId { get; set; }
        public string UserName { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public string PinCode { get; set; }
        public string Address { get; set; }
        public int TempleCityId { get; set; }
        public int TempleStateId { get; set; }
        public string BillingAddress { get; set; }
        public string OrderNO { get; set; }
        public string InvoiceNo { get; set; }
        public int PaymentMode { get; set; }
        public int PaymentStatus { get; set; }
        public int Total { get; set; }
        public string UserQuery { get; set; }
        public int AcmdNoOfDays { get; set; }
        public List<UserServiceDetails> ServiceDetails { get; set; }
        public List<UserAccommodationDetails> AccommodationDetails { get; set; }
    }

    public class UserServiceDetails
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public int ServicePrice { get; set; }
        public DateTime BookingDate { get; set; }
        public string BookingTime { get; set; }
    }

    public class UserAccommodationDetails
    {
        public int RoomTypeId { get; set; }
        public string RoomType { get; set; }
        public int RoomPrice { get; set; }
        public DateTime RoomBookingDate { get; set; }
        public string RoomBookingTime { get; set; }
        public DateTime CheckInDate { get; set; }
        public string CheckInTime { get; set; }
        public DateTime CheckOutDate { get; set; }
        public string CheckOutTime { get; set; }
    }

    public class TempleOrders
    {
        public string OrderNO { get; set; }
        public string InvoiceNo { get; set; }
        public int Result { get; set; }
    }

    public class TempleUserDashboardModel
    {
        public int UserId { get; set; }
        public int TempleId { get; set; }
        public string TempleName { get; set; }
        public int RoomTypeId { get; set; }
        public string RoomType { get; set; }
        public int RoomPrice { get; set; }
        public int DarshanTypeId { get; set; }
        public string DarshanType { get; set; }
        public int DarshanPrice { get; set; }
        public string InvoiceNo { get; set; }
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        //public DateTime BookingTime { get; set; }
        public string BookingDateTime { get; set; }
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public int BookingAmount { get; set; }
        public string OrderNo { get; set; }
        public int TotalAmount { get; set; }
        public string ModeOfPayment { get; set; }
    }
}

