export class TempleServiceAdmin {
    TempleTypeId: number;
    TempleId: number;
    TempleName: string;
    AboutTemple: string;
    TempleDescription: string;
    TempleTransport: string;
    StateId: number;
    CityId: number;
    CityName: string;
    StateName: string;
    ServicesTimings: ServicesTimings[];
    CustomerReviews: string;
    Action: string;
    TempleImageFileName: string;
}

export class ServicesTimings {
    serviceId: number;
    serviceName: string;
    serviceTimings: string;
    servicePrice: number;
    templeId: number
}

export class ServiceDetailDateTime {
    serviceId: number;
    serviceName: string;
    serviceTimings: string;
    servicePrice: number;
    templeId: number;
    bookingDate: Date;
    bookingTime: string;
}

export class ServicesTimingsWithCheckBox {
    serviceId: number;
    serviceName: string;
    serviceTimings: string;
    servicePrice: number;
    templeId: number;
    checked: boolean = false;
}

export class AccommodationTimings {
    roomTypeId: number;
    roomType: string;
    roomTimings: string;
    roomPrice: number;
    templeId: number;
}

export class AccommodationTimingsWithCheckBox {
    roomTypeId: number;
    roomType: string;
    roomTimings: string;
    roomPrice: number;
    templeId: number;
    checked: boolean = false;
}

export class State {
    stateID: number;
    stateName: string;
}

export class City {
    cityID: number;
    cityName: string;
}

export class Temple {
    templeTypeId: number;
    templeType: string;
    templeId: number;
    templeName: string;
    aboutTemple: string;
    templeDescription: string;
    templeTransport: string;
    stateId: number;
    stateName: string;
    cityId: number;
    cityName: string;
    customerReviews: string;
    servTimings: string;
    serviceId: number;
    roomTypeId: number;
    roomTimings: string;
    templeImage: any;
    templeImageFileName: string;
}

export class TempleWithType {
    templeId: number;
    templeTypeId: number;
    templeTypeName: string;
    templeName: string;
    templeCity: string;
    cityId: number;
    cityName: string;
    stateId: number;
    stateName: string;
}

export class TempleType {
    templeTypeId: number;
    templeTypeName: string;
}

export enum TempleTypeData {
    EndowmentTemple = 1,
    NonEndowmentTemple = 2
}

export interface TempleUserServiceRequest {
    UserName: string;
    UserEmail: string;
    TempleId: number;
    UserMobileNo: string;
    ServiceId: number;
    ServiceName: string;
    ServicePrice: number;
    BookingDate: Date;
    BookingTime: string;
    TempleCity: string;
    RoomTypeId: number;
    RoomType: string;
    RoomPrice: number;
    CheckInDate: Date;
    CheckInTime: string;
    CheckOutDate: Date;
    CheckOutTime: string;
    AcmdNoOfDays: number;
    UserRequestQuery: string;

    DarshanTypeId: number;
    DarshanType: string;
    DarshanPrice: number;
    NoOfPerson: number;
}

export interface UserServiceRequest {
    UserName: string;
    UserEmail: string;
    TempleId: number;
    UserMobileNo: string;
    TempleCity: string;
    TempleCityId: number;
    TempleStateId: number;
    RoomTypeId: number;
    RoomType: string;
    RoomPrice: number;
    AcmdDate: Date
    AcmdTime: string;
    AcmdNoOfDays: number
    UserRequestQuery: string;
    serviceDetails: ServiceRequest[];
    accommodationDetails: AccommodationRequest[];

    DarshanTypeId: number;
    DarshanType: string;
    DarshanPrice: number;
    NoOfPerson: number;
}

export interface ServiceRequest {
    ServiceId: number;
    ServiceName: string;
    ServicePrice: number;
    BookingDate: Date;
    BookingTime: string;
}

export interface AccommodationRequest {
    RoomTypeId: number;
    RoomType: string;
    RoomPrice: number;
    RoomBookingDate: Date;
    RoomBookingTime: string;
    CheckInDate: Date;
    CheckInTime: string;
    CheckOutDate: Date;
    CheckOutTime: string;
}

export interface CartItems {
    UserName: string;
    EmailId: string;
    TempleId: number;
    MobileNumber: string;
    TempleCity: string;
    // RoomTypeId: number;
    // RoomType: string;
    // RoomPrice: number;
    // DarshanTypeId: number;
    // DarshanType: string;
    // DarshanPrice: number;
    TempleCityId: number;
    TempleStateId: number;
    AcmdNoOfDays: number;
    UserRequestQuery: string;
    BookingLocation: string;
    BookingStatusId: number;
    PinCode: string;
    BillingAddress: string;
    // NewPinCode: string;
    CityId: number;
    NewCityId: number;
    PaymentStatus: number;
    PaymentMode: number;
    OrderNo: string;
    InvoiceNo: string;
    Total: number;
    UserQuery: string
    ServiceDetails: ServiceRequest[];
    AccommodationDetails: AccommodationRequest[];
}

export interface TempleUserBillingDetails {
    UserName: string;
    UserEmail: string;
    UserMobileNo: string;
    TempleId: number;
    ServiceId: number;
    UserAddress: string;
    Pincode: string;
    CityId: number;
    // ServiceDate: Date;
    // ServiceTime: string;
    // ServiceName: string;
    // ServicePrice: number;
    // UserRequestQuery: string;
}

export interface TempleServiceRequest {
    ServiceId: number;
    UserName: string;
    UserEmail: string;
    UserMobileNumber: string;
    TempleId: number;
    TempleName: string;
    CityName: string;
    StateName: string;
    UserRequest: string;
    Aging: number;
}

export interface TempleOrderDetailService {
    orderNo: string;
    invoice: string;
    emailid: string;
    serviceName: string;
    templeName: string;
    dateOfService: string;
    servicePrice: number;
    modeOfPayment: number;
    paymentDate: string;
    totalAmount: number;
    templeState: string;
    templeCity: string;
    bookingStatus: string;
}

export interface TempleOrderDetailsAccommodation {
    invoice: string;
    emailid: string;
    templeName: string;
    room: string;
    roomPrice: number;
    noOfDaysStay: number;
    checkInDateTime: string;
    checkOutDateTime: string;
    modeOfPayment: number;
    paymentDate: string;
    totalAmount: number;
}

export interface TempleUserDashboardModel {
    userId: number;
    templeId: number;
    templeName: string;
    roomTypeId: number;
    roomType: string;
    roomPrice: number;
    darshanTypeId: number;
    darshanType: string;
    darshanPrice: number;
    invoiceNo: string;
    bookingId: number;
    bookingDate: Date;
    bookingDateTime: string;
    serviceId: number;
    serviceName: string;
    bookingAmount: number;
    orderNo: string;
    totalAmount: number;
    modeOfPayment: string;
}

export interface TempleUserInvoiceData {
    userId: number;
    templeId: number;
    templeName: string;
    roomTypeId: number;
    roomType: string;
    roomPrice: number;
    darshanTypeId: number;
    darshanType: string;
    darshanPrice: number;
    invoiceNo: string;
    totalAmount: number;
    modeOfPayment: string;
}

export interface TempleUserServiceData {
    bookingId: number;
    bookingDate: Date;
    bookingDateTime: string;
    serviceId: number;
    serviceName: string;
    bookingAmount: number;
    orderNo: string;
    invoiceNo: string;
    templeId: number;
}

export interface TempleDashboardLoggedInUser {
    userId: number;
    userTypeId: number
}

export interface InvoiceData {
    invoice: string;
    templeName: string;
    templeCity: string;
    templeState: string;
    paymentDate: string;
    bookingStatus: string;
}