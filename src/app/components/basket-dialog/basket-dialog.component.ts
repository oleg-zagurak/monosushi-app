import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})
export class BasketDialogComponent {
  public orders: IProduct[] = [];
  public totalPrice = 0;
  public totalCount = 0;
  private changesDetect: boolean = false;
  private subscription!: Subscription;
  constructor(private ordersService: OrdersService) { }
  ngOnInit(): void {
    this.loadBasket();
    this.subscription = this.ordersService.basketChange.subscribe(() => {
      this.loadBasket();
    })
  }

  ngOnDestroy(): void {
    this.saveChanges();
    this.subscription?.unsubscribe();
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

  delete(id: number): void{
    this.ordersService.delete(id);
  }

  setAmount(sign: boolean, product: IProduct): void {
    this.changesDetect = true;
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
    this.getTotal();
    this.saveChanges();
  }

  private saveChanges(): void {
    if (this.changesDetect) {
      this.ordersService.save(this.orders);
      this.changesDetect = false;
    }
  }
}
