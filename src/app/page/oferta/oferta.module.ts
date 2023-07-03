import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/module/shared.module';
import {OfertaRoutingModule} from './oferta-routing.module';
import {OfertaComponent} from './oferta.component';



@NgModule({
  declarations: [
    OfertaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OfertaRoutingModule
  ]
})
export class OfertaModule { }
