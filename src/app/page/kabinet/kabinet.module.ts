import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/module/shared.module';
import { KabinetRoutingModule } from './kabinet-routing.module';

import { KabinetComponent } from './kabinet.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { HistoryComponent } from './history/history.component';
import { PasswordComponent } from './password/password.component';
import { SavePopupComponent } from '../../components/save-popup/save-popup.component';



@NgModule({
  declarations: [
    KabinetComponent,
    UserInfoComponent,
    HistoryComponent,
    PasswordComponent,
    SavePopupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    KabinetRoutingModule
  ]
})
export class KabinetModule { }
