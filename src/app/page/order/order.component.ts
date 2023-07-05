import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICount, IOrder } from 'src/app/shared/interfaces/order';
import { IProduct } from 'src/app/shared/interfaces/product';
import { IUser } from 'src/app/shared/interfaces/user';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  public openselect = false;
  public minDate: Date;
  public maxDate: Date;
  public orderForm!: FormGroup<any>
  public user: IUser | null = null;
  public products: IProduct[] = [];
  public totalPrice = 0;
  public changesDetect: boolean = false;
  private subscription!: Subscription;
  public isValidate: boolean = false;
  public isAddress = false;
  public isTime = false;
  public selfPick = false;
  public count = 0;


  constructor(private fb: FormBuilder,
    private ordersService: OrdersService,
    private db: DbDataService,
    private router: Router) {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 0, currentMonth, currentDay);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    }

  }

  ngOnInit(): void {
    this.products = this.ordersService.getOrders();
    this.subscription = this.ordersService.basketChange.subscribe(() => {
      this.loadProducts();
    })
    this.getTotal();
    this.initOrderForm();
    this.orderForm.valueChanges.subscribe(() => {
      this.validationError();
    })
    if (this.user) {
      this.orderForm.patchValue({
        tel: this.user.tel,
        name: this.user.name
      })
    }
    this.validationError();
    this.getCount();
  }

  ngOnDestroy(): void {
    this.saveChanges();
    this.subscription?.unsubscribe();
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      devicesCount: [1],
      paymentType: ['cod'],
      deliveryType: ['courier'],
      orderBefore: [true],
      name: ['', Validators.required],
      tel: ['', Validators.required],
      date: [null],
      timeInterval: ['1'],
      ourAdress: ['0'],
      street: [null],
      buildingNumber: [null],
      enterence: [null],
      flatNumber: [null]
    })
  }

  addEvent(e: Event) {
    let elem = e.target as HTMLInputElement;
    if (this.getByControlName('date') === 'null') {
      this.orderForm.patchValue({
        date: null
      })
      elem.value = '';
    }
  }

  getByControlName(name: string): string {
    return String(this.orderForm.get(name)?.value)
  }

  loadProducts(): void {
    this.products = this.ordersService.getOrders();
    this.getTotal();
  }

  getTotal(): void {
    this.totalPrice = this.products
      .reduce((total: number, product: IProduct) => total + (product.count * product.price), 0);
  }

  delete(id: string): void {
    this.ordersService.delete(id);
  }

  setAmount(sign: boolean, product: IProduct | { count: number }): void {
    this.changesDetect = true;
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
    this.getTotal();
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.changesDetect) {
      this.ordersService.save(this.products);
      this.changesDetect = false;
    }
  }
  validationError(): void {
    this.isValidate = true;

    if (this.getByControlName('name') === '' || this.getByControlName('tel') === '') {
      this.isValidate = false;
    }

    if (this.getByControlName('orderBefore') === 'true' &&
      (this.getByControlName('date') === 'null' || this.getByControlName('timeInterval') == '1')) {
      this.isTime = true;
      this.isValidate = false;
    } else {
      this.isTime = false;
    }

    if (this.getByControlName('deliveryType') === 'courier' &&
      (this.getByControlName('street') === 'null' || this.getByControlName('buildingNumber') === 'null')) {
      this.isAddress = true;
      this.isValidate = false;
    } else {
      this.isAddress = false;
    }

    if (this.getByControlName('deliveryType') === 'local' && this.getByControlName('ourAdress') === '0') {
      this.selfPick = true;
      this.isValidate = false;
    } else {
      this.selfPick = false;
    }

  }

  createOrder(): void {
    this.count = ++this.count;
    let order: IOrder = {...this.orderForm.value, userId: this.user?.id || 'anonim', orderNumber: this.count, isDone: false,
    products: this.products, orderTime: new Date()};
    this.updateCount();
    this.db.API = 'orders';
    this.db.create(order).then(() => {
      this.ordersService.clear();
      this.router.navigateByUrl('/');
    },
    (e) =>{
      console.error(e)
    })
  }
  getCount(): void{
    this.db.API = 'count';
    this.db.getOne('count').subscribe((data) => {
      let number: number = data['count'] as number;
      this.count = number;
    },
    (e) =>{
      console.error(e)
    })
  }
  updateCount(): void{
    this.db.API = 'count';
    this.db.update('count', {count: this.count} ).catch((e) => {
      console.error(e);
    })
  }
}
