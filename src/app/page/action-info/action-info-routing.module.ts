import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import {ActionInfoComponent} from './action-info.component';
import {actionResolver} from '../../shared/services/resolvers/action/action.resolver';


const routes: Routes = [
  {path: ':id', component: ActionInfoComponent, resolve: { action: actionResolver} }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionInfoRoutingModule { }
