import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Product } from '../../models/products';
import SwiperCore, { Navigation, Pagination, Mousewheel, Autoplay } from 'swiper';



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

  
  products: Product[] = [
    {id:1,
    name:'uno',
    price:123,
    category:'uno',
    imageUrl:'imagen1',
    description:'un producto,'
    },
    {id:2,
      name:'dos',
      price:123,
      category:'dos',
      imageUrl:'imagen2',
      description:'otro producto,'
    },
    {id:3,
      name:'tres',
      price:123,
      category:'tres',
      imageUrl:'imagen3',
      description:'y otro producto,'
    },
    {id:4,
      name:'ccuatro',
      price:123,
      category:'dos',
      imageUrl:'imagen4',
      description:'otro producto,'
    },
    {id:5,
      name:'cinco',
      price:123,
      category:'dos',
      imageUrl:'imagen5',
      description:'otro producto,'
    },
    {id:6,
      name:'seis',
      price:123,
      category:'dos',
      imageUrl:'imagen6',
      description:'otro producto,'
    },
    {id:7,
      name:'siete',
      price:123,
      category:'dos',
      imageUrl:'imagen7',
      description:'otro producto,'
    },
    ]
  constructor() { }

  ngOnInit(): void {
  
  }

}
