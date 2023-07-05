import { Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { Subject } from 'rxjs';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public basketChange: Subject<boolean> = new Subject();
  constructor() { }

  add(order: IProduct): void {
    let orders: IProduct[] = [];
    if (localStorage.length > 0 && localStorage.getItem('orders')) {
      orders = JSON.parse(localStorage.getItem('orders') as string);
      if (orders.some(el => el.id === order.id)) {
        let index = orders.findIndex(el => el.id === order.id);
        orders[index].count += order.count
      } else {
        orders.push(order)
      }
    } else {
      orders.push(order)
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    order.count = 1;
    this.basketChange.next(true);
  }

  addToUser(): void{
    let user: IUser | null = null;
    if(localStorage.getItem('currentUser')) user = JSON.parse(localStorage.getItem('currentUser') as string);
    if(user){
      
    }
  }
  getOrders(): IProduct[] {
    let orders: IProduct[] = [];
    if (localStorage.length > 0 && localStorage.getItem('orders')) {
      orders = JSON.parse(localStorage.getItem('orders') as string);
    }
    return orders;
  }

  save(ordersList: IProduct[]): void {
    let orders: IProduct[] = JSON.parse(localStorage.getItem('orders') as string);
    orders.forEach((el, i) => {
      el.count = ordersList[i].count;
    })
    localStorage.setItem('orders', JSON.stringify(orders));
    this.basketChange.next(true);
  }

  delete(id: string): void {
    let orders: IProduct[] = JSON.parse(localStorage.getItem('orders') as string);
    let orderIndex: number = orders.findIndex((product) => product.id === id)
    if (orderIndex >= 0) {
      orders.splice(orderIndex, 1);
      localStorage.setItem('orders', JSON.stringify(orders));
      this.basketChange.next(true);
    } else {
      throw new Error('Product doesn\'t exist');
    }
  }
  clear(): void{
    localStorage.removeItem('orders');
    this.basketChange.next(true);
  }
}
