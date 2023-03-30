import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper';

SwiperCore.use([Navigation, Pagination, Mousewheel]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
