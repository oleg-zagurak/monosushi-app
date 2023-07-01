import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { ActionsComponent } from './page/actions/actions.component';
import { DeliveryComponent } from './page/delivery/delivery.component';
import { AboutUsComponent } from './page/about-us/about-us.component';
import { ProductCategoryComponent } from './page/product-category/product-category.component';
import { AdminComponent } from './page/admin/admin/admin.component';
import { AdminActionsComponent } from './page/admin/admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './page/admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './page/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './page/admin/admin-orders/admin-orders.component';
import { ActionInfoComponent } from './page/action-info/action-info.component';
import { ProductInfoComponent } from './page/product-info/product-info.component';
import { productResolver } from './shared/services/resolvers/product/product.resolver';
import { actionResolver } from './shared/services/resolvers/action/action.resolver';
import { KabinetComponent } from './page/kabinet/kabinet/kabinet.component';
import { HistoryComponent } from './page/kabinet/history/history.component';
import { PasswordComponent } from './page/kabinet/password/password.component';
import { UserInfoComponent } from './page/kabinet/user-info/user-info.component';
import { OfertaComponent } from './page/oferta/oferta.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'actions', component: ActionsComponent},
  {path: 'action/:id', component: ActionInfoComponent, resolve: {action: actionResolver}},
  {path: 'dostavka-ta-oplata', component: DeliveryComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'dogovir-oferta', component: OfertaComponent},
  {path: 'product-category/:category', component: ProductCategoryComponent},
  {path: 'product-category/:category/:subcategory', component: ProductCategoryComponent},
  {path: 'product/:id', component: ProductInfoComponent, resolve:{product: productResolver}},
  {path: 'kabinet', component: KabinetComponent, children: [
    {path: 'info', component: UserInfoComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'password', component: PasswordComponent},
    {path: '', pathMatch: 'full', redirectTo: 'info'},
  ]},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'actions', component: AdminActionsComponent},
    {path: 'categories', component: AdminCategoryComponent},
    {path: 'products', component: AdminProductsComponent},
    {path: 'orders', component: AdminOrdersComponent},
    {path: '', pathMatch: 'full', redirectTo: 'actions'},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    scrollOffset: [0, 0],
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
