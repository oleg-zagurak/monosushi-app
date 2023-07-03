import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDialogComponent } from './basket-dialog.component';
import { IProduct } from 'src/app/shared/interfaces/product';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { mockOrdersService } from 'src/app/test/mockOrdersService';

describe('BasketDialogComponent', () => {
  let component: BasketDialogComponent;
  let fixture: ComponentFixture<BasketDialogComponent>;
  let ordersService: OrdersService;
  let products: IProduct[] = [{
    category: {
      name: 'string',
      path: 'string',
      imagePath: 'string',
      subcategory: 'string',
      id: 2
    },
    name: 'string',
    path: 'string',
    ingredients: 'string',
    weight: 'string',
    price: 1,
    imagePath: 'string',
    count: 1,
    id: 2
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasketDialogComponent],
      providers: [
        {provide: OrdersService, useValue: new mockOrdersService}
      ]
    });
    fixture = TestBed.createComponent(BasketDialogComponent);
    component = fixture.componentInstance;
    ordersService = TestBed.inject(OrdersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase the product count when sign is true', () => {
    const product = { count: 1 };
    component.orders = products;

    component.setAmount(true, product);

    expect(product.count).toBe(2);
  });

  it('should decrease the product count when sign is false and count is greater than 1', () => {
    const product = { count: 2 };
    component.orders = products;

    component.setAmount(false, product);

    expect(product.count).toBe(1);
  });

  it('should not decrease the product count when sign is false and count is 1', () => {
    const product = { count: 1 };
    component.orders = products;

    component.setAmount(false, product);

    expect(product.count).toBe(1);
  });

  it('should save changes when changesDetect is true', () => {
    component.changesDetect = true;
    spyOn(ordersService, 'save');

    component.saveChanges();

    expect(ordersService.save).toHaveBeenCalledWith(component.orders);
    expect(component.changesDetect).toBeFalse();
  });

  it('should not save changes when changesDetect is false', () => {
    component.changesDetect = false;
    spyOn(ordersService, 'save');

    component.saveChanges();

    expect(ordersService.save).not.toHaveBeenCalled();
    expect(component.changesDetect).toBeFalse();
  });
});
