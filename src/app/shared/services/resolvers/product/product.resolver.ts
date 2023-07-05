import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product';
import { DbDataService } from '../../database/db-data.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export const productResolver: ResolveFn<IProduct> = (route, state) => {
  const db = inject(DbDataService);
  db.API = environment.API.products;
  return db.getOne(route.paramMap.get('id') as string) as Observable<IProduct>;
};