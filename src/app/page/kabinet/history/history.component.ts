import { Component } from '@angular/core';
import {IProduct} from "../../../shared/interfaces/product";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  public orders = [
    {
      number: 103,
      date: '04 2023 18:47:05',
      status: false,
      address: 'Самовивіз',
      products: [
        {
          "name": "Філадельфія з лососем",
          "path": "filadelfiya-z-lososem",
          "imagePath": "https://firebasestorage.googleapis.com/v0/b/mono-homework.appspot.com/o/images%2Fproducts%2F1.-filadelfiya-z-lososem.jpg.pagespeed.ce.axvTz8qDqj.jpg?alt=media&token=881bb799-a5a2-43c6-a89d-c0faf69a4f12",
          "ingredients": "Риc, крем сир, огірок, лосось",
          "weight": 280,
          "price": 267,
          "count": 1,
          "category": {
            "name": "роли",
            "path": "roli",
            "imagePath": "https://firebasestorage.googleapis.com/v0/b/mono-homework.appspot.com/o/images%2Fcategories%2Fnav-img-rolls.svg?alt=media&token=8948f847-29f4-4d56-be44-37fd5be14f1c",
            "id": 1
          },
          "id": 1
        },
        {
          "name": "roli з лососем",
          "path": "filadelfiya-z-lososem",
          "imagePath": "https://firebasestorage.googleapis.com/v0/b/mono-homework.appspot.com/o/images%2Fproducts%2F1.-filadelfiya-z-lososem.jpg.pagespeed.ce.axvTz8qDqj.jpg?alt=media&token=881bb799-a5a2-43c6-a89d-c0faf69a4f12",
          "ingredients": "Риc, крем сир, огірок, лосось",
          "weight": 280,
          "price": 267,
          "count": 2,
          "category": {
            "name": "роли",
            "path": "roli",
            "imagePath": "https://firebasestorage.googleapis.com/v0/b/mono-homework.appspot.com/o/images%2Fcategories%2Fnav-img-rolls.svg?alt=media&token=8948f847-29f4-4d56-be44-37fd5be14f1c",
            "id": 1
          },
          "id": 1
        }
      ]
    },
    {
      number: 1034,
      date: '08 2022 18:47:55',
      status: true,
      address: 'Львів, вулиця Франка 61',
      products: [
        {
          "name": "Філадельфія з лососем",
          "path": "filadelfiya-z-lososem",
          "imagePath": "https://firebasestorage.googleapis.com/v0/b/mono-homework.appspot.com/o/images%2Fproducts%2F1.-filadelfiya-z-lososem.jpg.pagespeed.ce.axvTz8qDqj.jpg?alt=media&token=881bb799-a5a2-43c6-a89d-c0faf69a4f12",
          "ingredients": "Риc, крем сир, огірок, лосось",
          "weight": 280,
          "price": 267,
          "count": 3,
          "category": {
            "name": "роли",
            "path": "roli",
            "imagePath": "https://firebasestorage.googleapis.com/v0/b/mono-homework.appspot.com/o/images%2Fcategories%2Fnav-img-rolls.svg?alt=media&token=8948f847-29f4-4d56-be44-37fd5be14f1c",
            "id": 1
          },
          "id": 1
        },
        {
          "name": "roli з лососем",
          "path": "filadelfiya-z-lososem",
          "imagePath": "https://firebasestorage.googleapis.com/v0/b/mono-homework.appspot.com/o/images%2Fproducts%2F1.-filadelfiya-z-lososem.jpg.pagespeed.ce.axvTz8qDqj.jpg?alt=media&token=881bb799-a5a2-43c6-a89d-c0faf69a4f12",
          "ingredients": "Риc, крем сир, огірок, лосось",
          "weight": 280,
          "price": 267,
          "count": 2,
          "category": {
            "name": "роли",
            "path": "roli",
            "imagePath": "https://firebasestorage.googleapis.com/v0/b/mono-homework.appspot.com/o/images%2Fcategories%2Fnav-img-rolls.svg?alt=media&token=8948f847-29f4-4d56-be44-37fd5be14f1c",
            "id": 1
          },
          "id": 1
        }
      ]
    }
  ]
  getTotal(order: any): number{
    let sum = 0;
    order.products.forEach((element: IProduct) => {
      sum += element.price * element.count;
    });
    return sum;
  }
}
