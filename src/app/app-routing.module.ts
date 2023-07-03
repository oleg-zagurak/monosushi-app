import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { DeliveryComponent } from './page/delivery/delivery.component';
import { ProductCategoryComponent } from './page/product-category/product-category.component';
import { authAccessGuard } from './shared/guards/auth-access.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'actions',
    loadChildren: () => import('./page/actions/actions.module').then(m => m.ActionsModule)
  },
  {
    path: 'action',
    loadChildren: () => import('./page/action-info/action-info.module').then(m => m.ActionInfoModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./page/order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'dostavka-ta-oplata',
    loadChildren: () => import('./page/delivery/delivery.module').then(m => m.DeliveryModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./page/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'dogovir-oferta',
    loadChildren: () => import('./page/oferta/oferta.module').then(m => m.OfertaModule)
  },
  {path: 'product-category', children: [
      {path: ':category', component: ProductCategoryComponent},
      {path: ':category/:subcategory', component: ProductCategoryComponent}
    ]},
  {
    path: 'product',
    loadChildren: () => import('./page/product-info/product-info.module').then(m => m.ProductInfoModule)
  },
  {
    path: 'kabinet', canActivate: [authAccessGuard],
    loadChildren: () => import('./page/kabinet/kabinet.module').then(m => m.KabinetModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./page/admin-auth/admin-auth.module').then(m => m.AdminAuthModule)
  },
  {
    path: 'admin', canActivate: [authAccessGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: 'logout', pathMatch: 'full', redirectTo: ''},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
