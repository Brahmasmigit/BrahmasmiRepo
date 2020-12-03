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
}

export class ServicesTimings {
    serviceId: number;
    serviceName: string;
    serviceTimings: string;
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