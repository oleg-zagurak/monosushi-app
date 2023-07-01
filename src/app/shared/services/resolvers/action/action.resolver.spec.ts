import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { actionResolver } from './action.resolver';

describe('actionResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => actionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
