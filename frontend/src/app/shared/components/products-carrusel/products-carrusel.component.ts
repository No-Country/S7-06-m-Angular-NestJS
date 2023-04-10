import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Product } from '../../models/store/products/product';
import SwiperCore, { Navigation, Pagination, Mousewheel, Autoplay, SwiperOptions } from 'swiper';



SwiperCore.use([Navigation, Pagination, Mousewheel, Autoplay]);

@Component({
  selector: 'app-products-carrusel',
  templateUrl: './products-carrusel.component.html',
  styleUrls: ['./products-carrusel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsCarruselComponent implements OnInit {

  @Input()
  title = "";

  @Input()
  visibleCarrusel = false;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    //autoplay: { delay: 5000, disableOnInteraction: false},
    loop: true,
    navigation: false,
    pagination:true,
    breakpoints: {
      550: {
        slidesPerView:4,
        navigation: true
      }
    }
  }


  constructor() { }

  ngOnInit(): void {

  }

}
