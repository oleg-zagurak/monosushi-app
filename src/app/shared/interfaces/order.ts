import { Timestamp } from "@angular/fire/firestore";
import { IProduct } from "./product";

export interface IOrder {
    userId: string,
    products: IProduct[],
    isDone: boolean,
    devicesCount: number,
    paymentType: string,
    deliveryType: string,
    orderBefore: boolean,
    name: string,
    tel: string,
    date: Date | null | Timestamp,
    timeInterval: string | null,
    ourAdress: string,
    street: string | null,
    buildingNumber: string | null,
    enterence: string | null,
    flatNumber: number | null,
    orderNumber: number,
    orderTime: Date | Timestamp,
    id: string
}

export interface ICount {
    count: number
}