import { Time } from '@angular/common';

export class TempleServiceAdmin {
    TempleTypeId: number;
    TempleId: number;
    TempleName: string;
    TempleDescription: string;
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
    templeDescription: string;
    stateId: number;
    stateName: string;
    cityId: number;
    cityName: string;
    customerReviews: string;
    servTimings: string;
    serviceId: number;
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
    DarshanTypeId: number;
    DarshanType: string;
    DarshanPrice: number;
    NoOfPerson: number;
    UserRequestQuery: string;
}

export interface UserServiceRequest {
    UserName: string;
    UserEmail: string;
    TempleId: number;
    UserMobileNo: string;
    TempleCity: string;
    RoomTypeId: number;
    RoomType: string;
    RoomPrice: number;
    DarshanTypeId: number;
    DarshanType: string;
    DarshanPrice: number;
    NoOfPerson: number;
    UserRequestQuery: string;
    serviceDetails: ServiceRequest[];
}

export interface ServiceRequest {
    ServiceId: number;
    ServiceName: string;
    ServicePrice: number;
    BookingDate: Date;
    BookingTime: string;
}

export interface CartItems {
    UserName: string;
    EmailId: string;
    TempleId: number;
    MobileNumber: string;
    TempleCity: string;
    RoomTypeId: number;
    RoomType: string;
    RoomPrice: number;
    DarshanTypeId: number;
    DarshanType: string;
    DarshanPrice: number;
    NoOfPerson: number;
    UserRequestQuery: string;
    BookingLocation: string;
    BookingStatusId: number;
    PinCode: string;
    NewAddress: string;
    NewPinCode: string;
    CityId: number;
    NewCityId: number;
    PaymentStatus: number;
    PaymentMode: number;
    OrderNo: string;
    InvoiceNo: string;
    Total: number;
    UserQuery: string
    ServiceDetails: ServiceRequest[];
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

export interface TempleOrderDetails {
    OrderNo: string;
    PaymentDateTime: string;
    BookingDateTime: string;
    EmailId: string;
    totalAmount: number;
    ServiceAmount: number;
    ModeofPayment: string;
    ServiceName: string;
    userId: number;
    roomType: string;
    roomPrice: number;
    darshanType: number;
    darshanPrice: number;
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