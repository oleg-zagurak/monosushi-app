import { Component } from '@angular/core';
import {IProduct} from "../../../shared/interfaces/product";
import { IOrder } from 'src/app/shared/interfaces/order';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { IUser } from 'src/app/shared/interfaces/user';
import { address } from 'src/app/shared/constants/self-address';
import { Timestamp } from "@angular/fire/firestore";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  public orders: IOrder[] = [];
  public user: IUser;
  constructor(private db: DbDataService){
    this.user = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  ngOnInit(): void{
    this.db.API = 'orders';
    this.db.getByUser(this.user.id).subscribe((data) => {
      this.orders = data as IOrder[];
      this.createAdress(this.orders[0])
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
}
