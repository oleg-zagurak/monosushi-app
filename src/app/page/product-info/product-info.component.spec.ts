import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { IProduct } from 'src/app/shared/interfaces/product';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;


  let fakeProduct: IProduct = {
    "name": "a",
    "imagePath": "a",
    "price": 0,
    "weight": "a",
    "path": "a",
    "ingredients": "a",
    "count": 1,
    "category": {
      "subcategory": "a",
      "name": "a",
      "path": "a",
      "imagePath": "a",
      "id": 1
    },
    "id": 1
  };

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProductInfoComponent],
        imports: [
          RouterTestingModule
        ],
        providers: [
          OrdersService
        ]
      });
      fixture = TestBed.createComponent(ProductInfoComponent);
      component = fixture.componentInstance;
      component.product = fakeProduct;
      fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment count if sign is true', () => {
    const initialCount = component.product.count;

    component.setAmount(true);

    expect(component.product.count).toBe(initialCount + 1);
  });

  it('should decrement count if sign is false and count is greater than 1', () => {
    const initialCount = 3;
    component.product.count = 3;

    component.setAmount(false);

    expect(component.product.count).withContext(`count is ${component.product.count}`).toBe(initialCount - 1);
  });

  it('should not decrement count if sign is false and count is 1', () => {
    const initialCount = 1;
    component.product.count = initialCount;

    component.setAmount(false);

    expect(component.product.count).toBe(initialCount);
  });
});
