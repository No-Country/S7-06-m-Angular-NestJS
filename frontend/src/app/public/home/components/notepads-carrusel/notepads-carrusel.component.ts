import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/models/store/products/product';
import { ProductService } from 'src/app/shared/services/product/product.service';
import SwiperCore, { Navigation, Pagination, Mousewheel, Autoplay, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation, Pagination, Mousewheel, Autoplay]);

@Component({
  selector: 'app-notepads-carrusel',
  templateUrl: './notepads-carrusel.component.html',
  styleUrls: ['./notepads-carrusel.component.css']
})

export class NotepadsCarruselComponent implements OnInit {

  products!: Product[];

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


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductsByCategory('libretas');
  }

  getProductsByCategory(category:string){
    this.productService.getProductByCategory(category).subscribe(data => {
      this.products = data;
    }, error => {
      console.log(error);
    })
  }

}
