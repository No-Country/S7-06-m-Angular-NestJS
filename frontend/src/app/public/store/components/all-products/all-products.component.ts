import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from 'src/app/shared/models/store/products/product';
import { ProductService } from 'src/app/shared/services/product/product.service';
import SwiperCore, { Navigation, Autoplay, Virtual, Scrollbar, SwiperOptions, EffectFade, Parallax  } from 'swiper';
SwiperCore.use([Virtual, Navigation, Autoplay, Scrollbar, EffectFade, Parallax ]);


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products!:Product[];

  categories!:Category[];

  title = 'Todos los Productos';

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    effect: "fade",
    parallax: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    }
  }

  constructor(
    private productService: ProductService,
    // private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.getAllProducts();

    this.productService.getAllCategories().subscribe(serverProductCategories => {
      this.categories = serverProductCategories;
    });
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(data)
    }, error => {
      console.log(error);
    })
  }

}
