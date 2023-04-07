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
    spaceBetween: 50,
    //autoplay: { delay: 10000, disableOnInteraction: false},
    loop: true,
    pagination:true,
    breakpoints: {
      600: {
        slidesPerView:2,
      }
    }
    }
    
    products: Product[] = [
      {id:1,
      name:'Libreta Mística',
      price:123,
      category:'Libretas Personalizadas',
      imageUrl:'https://d22fxaf9t8d39k.cloudfront.net/eac526a241233dc69f908158fbe2d950c2e439e994e6c72e13c63585f2df8b8c9166.jpeg',
      description:'un producto,'
      },
      {id:2,
        name:'Libreta de harry potter',
        price:123,
        category:'dos',
        imageUrl:"https://http2.mlstatic.com/D_NQ_NP_933202-MLA54249284561_032023-W.jpg",
        description:'otro producto,'
      },
      {id:2,
        name:'Libreta de winnie poo',
        price:123,
        category:'dos',
        imageUrl:"https://i.pinimg.com/originals/9d/36/1d/9d361da466b2dcc3dc7780256cbe6ff1.jpg",
        description:'otro producto,'
      },

    
    ]
  constructor() { }

  ngOnInit(): void {
  }

}
