import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {KabinetComponent} from './kabinet.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {HistoryComponent} from './history/history.component';
import {PasswordComponent} from './password/password.component';


const routes: Routes = [
  {path: '', component: KabinetComponent, children: [
      {path: 'info', component: UserInfoComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'password', component: PasswordComponent},
      {path: '', pathMatch: 'full', redirectTo: 'info'},
    ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KabinetRoutingModule { }
