import { IProduct } from "./product";

export interface Order {
    userId: number,
    id: number,
    products: IProduct[],
    isOpen: boolean,
    date: string
}
