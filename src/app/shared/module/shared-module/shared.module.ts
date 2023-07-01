import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';

import { SwiperModule } from 'swiper/angular';


const MATERIAL = [
  MatDialogModule
]

@NgModule({
  declarations: [],
  imports: [
    ...MATERIAL,
    SwiperModule,
    CommonModule
  ],
  exports: [
    ...MATERIAL,
    SwiperModule,
    CommonModule
  ]
})
export class SharedModule { }
