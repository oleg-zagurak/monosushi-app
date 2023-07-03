import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';


const routes: Routes = [
  {path: '', component: AdminComponent, children: [
      {path: 'actions', component: AdminActionsComponent},
      {path: 'categories', component: AdminCategoryComponent},
      {path: 'products', component: AdminProductsComponent},
      {path: 'orders', component: AdminOrdersComponent},
      {path: '', pathMatch: 'full', redirectTo: 'actions'},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
