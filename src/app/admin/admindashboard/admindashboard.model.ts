// export interface MultipleVendorList1 {
//     BookingId: number;
//     ServiceId: number;
//     VendorName: string;
//     VendorListId: VendorId[];
//     VendorListName: VendorName[];
//     VendorData: VendorData[];
//     Checked: boolean;
// }

export interface Vendor {
    bookingId: number;
    serviceId: number;
    vendorId: number;
    vendorName: string;
    vendorIdData: number[];
    vendorNameData: string[];
    // VendorData: VendorData[];
    checked: boolean[];
}

// export interface VendorId {
//     VendorId: number;
// }

// export interface VendorName {
//     VendorName: string
// }

// export interface VendorData {
//     VendorId: number;
//     VendorName: string
// }