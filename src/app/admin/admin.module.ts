import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/module/shared.module';

import {AdminComponent} from './admin.component';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminActionsComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
