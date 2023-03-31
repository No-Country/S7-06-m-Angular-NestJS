import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Navigation, Pagination, Mousewheel, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Pagination, Mousewheel]);

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
    pagination:{clickable:false},
    navigation: false,
    autoplay: { delay: 4000, disableOnInteraction: false},
    loop: true,
    breakpoints:{
      500:{
        navigation: true
      }
    }
    }

  constructor() { }

  ngOnInit(): void {
  }

}