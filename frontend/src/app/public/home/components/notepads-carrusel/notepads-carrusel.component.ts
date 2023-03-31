import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/models/products';
import SwiperCore, { Navigation, Pagination, Mousewheel, Autoplay, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Pagination, Mousewheel, Autoplay]);

@Component({
  selector: 'app-notepads-carrusel',
  templateUrl: './notepads-carrusel.component.html',
  styleUrls: ['./notepads-carrusel.component.css']
})
export class NotepadsCarruselComponent implements OnInit {

  
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: { delay: 10000, disableOnInteraction: false},
    loop: true,
    pagination:true,
    breakpoints: {
      500: {
        slidesPerView:2,
      }
    }
    }
    
    products: Product[] = [
      {id:1,
      name:'uno',
      price:123,
      category:'uno',
      imageUrl:'../../../../../assets/store/products/Lapiceras 1100.png',
      description:'un producto,'
      },
      {id:2,
        name:'dos',
        price:123,
        category:'dos',
        imageUrl:'../../../../../assets/store/products/Lapiceras 1100.png',
        description:'otro producto,'
      },]
  constructor() { }

  ngOnInit(): void {
  }

}
