import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { address } from 'src/app/shared/constants/self-address';
import { IOrder } from 'src/app/shared/interfaces/order';
import { IProduct } from 'src/app/shared/interfaces/product';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  public orders: IOrder[] = [];

  constructor(private db: DbDataService){
  
  }

  ngOnInit(): void{
    this.db.API = 'orders';
    this.getOrders();
  }
  getOrders(): void{
    this.db.getAll().subscribe((data) => {
      this.orders = data as IOrder[];
    })
  }
  getTotal(order: any): number{
    let sum = 0;
    order.products.forEach((element: IProduct) => {
      sum += element.price * element.count;
    });
    return sum;
  }

  createAdress(order: IOrder): string{
    let {ourAdress, street, buildingNumber, enterence, flatNumber} = order;
    if(ourAdress !== '0'){
      return 'вул. ' + address[ourAdress]
    }
    let result = 'вул. ';
    [street, buildingNumber, enterence, flatNumber].forEach(a => {
      if(a === null){
        a = '';
      }
    })
    if(street){
      result += street + ' ' + buildingNumber
    }
    if(enterence) result += enterence;
    if(flatNumber) result += '/'+ flatNumber
    return result
  }
  createDate(order: IOrder): string{
    let {orderTime} = order;
    let result = '';
    let date;
    if(orderTime instanceof Timestamp){
      date = orderTime.toDate();
    }
    if(date){
      let year = date.getFullYear();
      let month = date.getMonth() < 10 ? `0${date.getMonth()}`: `${date.getMonth()}`;
      let day = date.getDay() < 10 ? `0${date.getDay()}`: `${date.getDay()}`;
      let hours = date.getHours() < 10 ? `0${date.getHours()}`: `${date.getHours()}`;
      let min = date.getMinutes() < 10 ? `0${date.getMinutes()}`: `${date.getMinutes()}`;
      result = `${day}.${month}.${year} ${hours}:${min}`;
    }
    return result;
  }

  cancel(order: IOrder): void{
    this.db.delete(order.id).then(() => {
      this.getOrders()
    })
    .catch((e) =>{
      console.error(e);
      
    })
  }

  done(order: IOrder): void{
    order.isDone = true;
    this.db.update(order.id, order).then(() => {
      this.getOrders()
    })
    .catch((e) =>{
      console.error(e);
      
    })
  }
}
