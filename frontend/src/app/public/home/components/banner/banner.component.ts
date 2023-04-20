import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Navigation, Pagination, Autoplay, SwiperOptions, Virtual } from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BannerComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: false,
    pagination: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        navigation: true
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
