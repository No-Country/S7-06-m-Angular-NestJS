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
  //autoplay: { delay: 5000, disableOnInteraction: false},
  loop: true,
  navigation: false,
  pagination:true,
  breakpoints: {
    500: {
      slidesPerView:4,
      navigation: true
    }
  }
  }
  
  products: Product[] = [
    {id:1,
    name:'Gomas de colores',
    price:123,
    category:'uno',
    imageUrl:'https://http2.mlstatic.com/D_NQ_NP_865110-MLA54031227294_022023-W.jpg',
    description:'un producto,'
    },
    {id:2,
      name:'Lapiceras',
      price:123,
      category:'dos',
      imageUrl:'../../../../../assets/store/products/Lapiceras 1100.png',
      description:'otro producto,'
    },
    {id:3,
      name:'Notas adesivas',
      price:123,
      category:'tres',
      imageUrl:'https://http2.mlstatic.com/D_NQ_NP_712764-MLA50970012056_082022-O.jpg',
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
