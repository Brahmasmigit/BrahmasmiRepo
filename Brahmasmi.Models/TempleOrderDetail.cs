using System;

namespace Brahmasmi.Models
{
    public class TempleOrderDetailService
    {
        public string OrderNo { get; set; }
        public string Invoice { get; set; }
        public string EmailId { get; set; }
        public string ServiceName { get; set; }
        public string TempleName { get; set; }
        public string DateOfService { get; set; }
        public int ServicePrice { get; set; }
        public string ModeOfPayment { get; set; }
        public string PaymentDate { get; set; }
        public int TotalAmount { get; set; }
        public int BookingStatusId { get; set; }
        public string BookingStatus { get; set; }
        public string TempleState { get; set; }
        public string TempleCity { get; set; }
    }

    public class TempleOrderDetailServiceAccommodation
    {
        public string Invoice { get; set; }
        public string EmailId { get; set; }
        public string TempleName { get; set; }
        public string Room { get; set; }
        public int RoomPrice { get; set; }
        public int NoOfDaysStay { get; set; }
        public string RoomBookingDate { get; set; }
        public string CheckInDateTime { get; set; }
        public string CheckOutDateTime { get; set; }
        public string ModeOfPayment { get; set; }
        public string PaymentDate { get; set; }
        public int TotalAmount { get; set; }
    }

    public class TempleOrderDetailByUser
    {
        public string OrderNo { get; set; }
        public string Invoice { get; set; }
        public string EmailId { get; set; }
        public string ServiceName { get; set; }
        public string TempleName { get; set; }
        public string DateOfService { get; set; }
        public int ServicePrice { get; set; }
        public string ModeOfPayment { get; set; }
        public string PaymentDate { get; set; }
        public int TotalAmount { get; set; }
        public int BookingStatusId { get; set; }
        public string BookingStatus { get; set; }
        public string TempleState { get; set; }
        public string TempleCity { get; set; }
        public string Room { get; set; }
        public int RoomPrice { get; set; }
        public int NoOfDaysStay { get; set; }
        public string RoomBookingDate { get; set; }
    }
}
