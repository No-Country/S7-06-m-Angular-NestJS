import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/store/products/product';
import { ProductService } from 'src/app/shared/services/product/product.service';
import SwiperCore, { Navigation, Autoplay, Virtual, Scrollbar, SwiperOptions } from 'swiper';
SwiperCore.use([Virtual, Navigation, Autoplay, Scrollbar ]);

@Component({
  selector: 'app-id-product',
  templateUrl: './id-product.component.html',
  styleUrls: ['./id-product.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IdProductComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: true,
    scrollbar: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    }
  }

  imagenes = [
    '../../../../../assets/store/products/Lapiceras 1100.png',
    '../../../../../assets/store/products/Lapiceras 2100.png'
  ]

  detail:string = 'Este es el detalle del producto, ahora lo estoy probando y acomodando para pantallas de 290px'

  finalPrice:number = 125

  favoriteFill:string = 'favorite_border';

  productQuantity:number = 1;

  product!:Product;

  constructor(
    private productService: ProductService,
    private activatedRoute:ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.productService.getProductById(params['id']).subscribe(getProductById => {
          this.product = getProductById;
        }
        );
    });
  }

  ngOnInit(): void {
  }

  favorite(){
    if(this.favoriteFill == 'favorite_border'){
      this.favoriteFill = 'favorite';
    } else{
      this.favoriteFill = 'favorite_border';
    }
  }

  handleProduct(value:string){
    let active:any = document.getElementById('error')
    if(this.productQuantity < 5 && value === 'add'){
      this.productQuantity += 1
      active.classList.remove('error-active');
    } else if( this.productQuantity>1 && value ==='remove'){
      this.productQuantity -= 1
    } else if(this.productQuantity == 1 && value ==='remove'){
      active.classList.add('error-active')
    }
  }

}
