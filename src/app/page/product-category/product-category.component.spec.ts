import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryComponent } from './product-category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DbDataService } from 'src/app/shared/services/database/db-data.service';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductCategoryComponent', () => {
  let component: ProductCategoryComponent;
  let fixture: ComponentFixture<ProductCategoryComponent>;
  let product = { count: 5 };
  let container: HTMLUListElement;
  let target: HTMLSpanElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategoryComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        DbDataService,
        OrdersService
      ]
    });
    fixture = TestBed.createComponent(ProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    container = document.createElement('ul');
    target = document.createElement('span');
    container.appendChild(target);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment count if sign is true', () => {
    const initialCount = product.count;

    component.setAmount(true, product);

    expect(product.count).toBe(initialCount + 1);
  });

  it('should decrement count if sign is false and count is greater than 1', () => {
    const initialCount = 3;
    product.count = 3;

    component.setAmount(false, product);

    expect(product.count).withContext(`count is ${product.count}`).toBe(initialCount - 1);
  });

  it('should not decrement count if sign is false and count is 1', () => {
    const initialCount = 1;
    product.count = initialCount;

    component.setAmount(false, product);

    expect(product.count).toBe(initialCount);
  });

  it('should remove "active" class from all elements and add it to the target element', () => {
    const element1 = document.createElement('li');
    const element2 = document.createElement('li');
    container.appendChild(element1);
    container.appendChild(element2);
    element2.appendChild(target)
    target.addEventListener('click', (e) => {
      component.checkActiveFilter(e, container)
    })
    

    element1.classList.add('active');

    target.dispatchEvent(new MouseEvent('click'));

    expect(element1.classList.contains('active')).toBe(false);

    expect(element2.classList.contains('active')).toBe(true);
  });

  it('should call the "filter" method with the correct filter value', () => {
    const datasetValue = 'subcategory-value';

    target.dataset['subcategory'] = datasetValue;
    target.addEventListener('click', (e) => {
      component.checkActiveFilter(e, container)
    })

    spyOn(component, 'filter');

    target.dispatchEvent(new MouseEvent('click'));

    expect(component.filter).toHaveBeenCalledWith(datasetValue);
  });

  it('should ignore filter method if container or target element types are incorrect', () => {
    const invalidContainer: any = 'invalidContainerType';
    const invalidTarget: any = 'invalidTargetType';
    spyOn(component, 'filter')

    component.checkActiveFilter(new MouseEvent('click'), invalidContainer);
    component.checkActiveFilter(new MouseEvent('click'), invalidTarget);

    expect(component.filter).not.toHaveBeenCalled;
  });

});
