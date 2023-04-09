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

  products: Product[] = [
    {id:1,
    name:'Gomas de colores',
    price:123,
    category:'uno',
    images:['imagen1'],
    description:'un producto,'
    },
    {id:2,
      name:'Lapiceras',
      price:123,
      category:'dos',
      images:['imagen2'],
      description:'otro producto,'
    },
    {id:3,
      name:'Notas adesivas',
      price:123,
      category:'tres',
      images:['imagen3'],
      description:'y otro producto,'
    },
    {id:4,
      name:'ccuatro',
      price:123,
      category:'dos',
      images:['imagen4'],
      description:'otro producto,'
    },
    {id:5,
      name:'cinco',
      price:123,
      category:'dos',
      images:['imagen5'],
      description:'otro producto,'
    },
    {id:6,
      name:'seis',
      price:123,
      category:'dos',
      images:['imagen6'],
      description:'otro producto,'
    },
    {id:7,
      name:'siete',
      price:123,
      category:'dos',
      images:['imagen7'],
      description:'otro producto,'
    },
    ]
  constructor() { }

  ngOnInit(): void {

  }

}
