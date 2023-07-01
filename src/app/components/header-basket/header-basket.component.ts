import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';

@Component({
  selector: 'app-header-basket',
  templateUrl: './header-basket.component.html',
  styleUrls: ['./header-basket.component.scss']
})
export class HeaderBasketComponent {
  public active = false;
  public orders: IProduct[] = [];
  public totalPrice = 0;
  public totalCount = 0;
  public dialogRef!: MatDialogRef<BasketDialogComponent>;
  constructor(private ordersService: OrdersService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBasket();
    this.ordersService.basketChange.subscribe(() => {
      this.loadBasket();
    })
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.closeOnNav();
      }
    })
  }

  loadBasket(): void {
    this.orders = this.ordersService.getOrders();
    this.getTotal();
  }
  
  getTotal(): void {
    this.totalPrice = this.orders
      .reduce((total: number, product: IProduct) => total + (product.count * product.price), 0);
    this.totalCount = this.orders
      .reduce((total: number, product: IProduct) => total + product.count, 0);
  }

  show(): void {
    let state = this.active;
    if (this.active && this.dialogRef) {
      this.dialogRef.close();
      this.active = false;
    }
    if (!this.active && !state) {
      this.dialogRef = this.dialog.open(BasketDialogComponent, {
        backdropClass: 'basket-bg',
        panelClass: 'basket-wrapper'
      })
      this.active = true;
    }
    if(this.dialogRef){
      this.dialogRef.afterClosed().subscribe(() =>{
      this.active = false;
      },
      (e) => {
        console.error(e)
      });
    }
  }

  closeOnNav(): void{
    this.dialogRef?.close();
    this.active = false;
  }
}