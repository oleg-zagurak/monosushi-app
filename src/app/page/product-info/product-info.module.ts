import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/module/shared.module';
import {ProductInfoRoutingModule} from './product-info-routing.module';

import {ProductInfoComponent} from './product-info.component';

@NgModule({
  declarations: [
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductInfoRoutingModule
  ]
})
export class ProductInfoModule { }
