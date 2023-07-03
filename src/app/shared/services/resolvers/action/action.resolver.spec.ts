import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { actionResolver } from './action.resolver';
import { IAction } from 'src/app/shared/interfaces/action';

describe('actionResolver', () => {
  const executeResolver: ResolveFn<IAction> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => actionResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
