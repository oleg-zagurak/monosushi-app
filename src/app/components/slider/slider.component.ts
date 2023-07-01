import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

import SwiperCore, { Navigation, Pagination, Scrollbar, Virtual } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Virtual]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 15,
    pagination: { clickable: true },
  };

  constructor() { }

  ngOnInit(): void {
  }
}
