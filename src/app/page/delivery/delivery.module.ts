import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/module/shared.module';
import {DeliveryRoutingModule} from './delivery-routing.module';

import {DeliveryComponent} from './delivery.component';

@NgModule({
  declarations: [
    DeliveryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryRoutingModule
  ]
})
export class DeliveryModule { }
