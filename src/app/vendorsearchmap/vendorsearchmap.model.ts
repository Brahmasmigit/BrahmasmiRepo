import { Binary } from 'selenium-webdriver/firefox';

export interface Language {
    languageID: number;
    languageName: string;
}

export class PanditModel {
    languageId: number;
    pujaLocation: string;        
    BookingDate: Date;
    BookingTime: string;
    serviceId: number;
    ServiceName: string;
    serviceType: string;
    serviceTypeId: number;
    astroId: number;
    packageId: number;
    packageName: string;
    Total: number;
    description: string;
    VendorList: string;
    UserId: number;
    CityId: number;
    CityName: string;
    isNewLocation: boolean;
    currentCityName: string;
    currentLocationAddress: string;
    currentLocationPincode: string;
    newCityName: string;
    newLocationAddress: string;
    newLocationPincode: string;
}

export class PanditList {
    vendorId: string;
}

export interface ServicePackageModel {
    packageID: number;
    serviceID: number;
    serviceName: string;
    serviceTypeName: string;
    serviceType: string;
    serviceTypeId: number; 
    packageName: string;
    astroAmount: number;
}

export interface City {
    CityId: number;
    cityName: string;
}

export interface VendorsDetails {
    vendorID: string;
    vendor_FirstName: string;
    vendor_MobileNumber: string;
    vendor_Address1: string;
    photo: Binary;
    specializationName: string;
    languages: string;
}

export interface Marker {
    vendor_Latitude: number;
    vendor_Longitude: number;
    label?: string;
    draggable: boolean;
    content?: string;
    isShown: boolean;
    icon: string;
}

export interface SelectedPanditForService {
    vendorID: string;
    vendor_FirstName: string;
    vendor_MobileNumber: string;
    vendor_Address1: string;
    specializationName: string;
    languages: string;
}