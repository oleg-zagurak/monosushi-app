import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productResolver } from './product.resolver';
import { IProduct } from 'src/app/shared/interfaces/product';

describe('productResolver', () => {
  const executeResolver: ResolveFn<IProduct> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
