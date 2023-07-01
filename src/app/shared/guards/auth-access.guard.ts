import { CanActivateFn, Router } from '@angular/router';
import { IUser, ROLE } from '../interfaces/user';
import { inject } from '@angular/core';

export const authAccessGuard: CanActivateFn = (route, state) => {
  let user: IUser = JSON.parse(localStorage.getItem('currentUser') as string);
  if(user && user.role === ROLE.USER && route.url[0].path === 'kabinet'){
    return true
  } else if(user && user.role === ROLE.ADMIN && route.url[0].path === 'admin'){
    return true;
  } else {
    let router = inject(Router);
    if(router) router.navigateByUrl('/');
    return false;
  }
};
