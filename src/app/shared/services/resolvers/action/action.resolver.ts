import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IAction } from 'src/app/shared/interfaces/action';
import { DbDataService } from '../../database/db-data.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export const actionResolver: ResolveFn<IAction> = (route, state) => {
  const db = inject(DbDataService);
  db.API = environment.API.actions;
  return db.getOne(route.paramMap.get('id') as string) as Observable<IAction>;
};
