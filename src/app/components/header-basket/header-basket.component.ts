import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

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
  private changesDetect: boolean = false;
  constructor(private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.loadBasket();
    this.ordersService.basketChange.subscribe(() => {
      this.loadBasket();
    })
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.closeOnNavigation();
      }
    })
  }

  ngOnDestroy(): void {
    this.saveChanges();
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

  show(): void {
    this.active = !this.active;
    this.saveChanges();
  }

  closeBasket(event: Event): void {
    let item: HTMLElement = event.target as HTMLElement;
    if (item.id === 'main') {
      this.active = !this.active;
      this.saveChanges();
    }
  }
  private closeOnNavigation(): void{
    this.active = false;
  }
  setAmount(sign: boolean, product: IProduct): void {
    this.changesDetect = true;
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
    this.getTotal();
  }
  private saveChanges(): void {
    if (this.changesDetect) {
      this.ordersService.save(this.orders);
      this.changesDetect = false;
    }
  }
}
