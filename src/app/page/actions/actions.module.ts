import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsComponent } from './actions.component';

import { SharedModule } from '../../shared/module/shared.module';
import { ActionsRoutingModule } from './actions-routing.module';



@NgModule({
  declarations: [
    ActionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActionsRoutingModule
  ]
})
export class ActionsModule { }
