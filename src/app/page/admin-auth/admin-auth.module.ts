import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthComponent } from './admin-auth.component';
import { SharedModule } from '../../shared/module/shared.module';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';



@NgModule({
  declarations: [
    AdminAuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminAuthRoutingModule
  ]
})
export class AdminAuthModule { }
