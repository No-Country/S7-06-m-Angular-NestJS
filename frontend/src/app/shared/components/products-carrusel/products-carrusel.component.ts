import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Product } from '../../models/products';
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
  autoplay: { delay: 5000, disableOnInteraction: false},
  loop: true,
  navigation: false,
  scrollbar:true,
  breakpoints: {
    500: {
      slidesPerView:4,
      navigation: true
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
    },
    {id:3,
      name:'tres',
      price:123,
      category:'tres',
      imageUrl:'../../../../../assets/store/products/Lapiceras 1100.png',
      description:'y otro producto,'
    },
    {id:4,
      name:'ccuatro',
      price:123,
      category:'dos',
      imageUrl:'../../../../../assets/store/products/Lapiceras 1100.png',
      description:'otro producto,'
    },
    ]
  constructor() { }

  ngOnInit(): void {
  
  }

}
