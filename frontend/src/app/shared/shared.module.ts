import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsCarruselComponent } from './components/products-carrusel/products-carrusel.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ProductsCarruselComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ],
  exports:[
    NavBarComponent,
    FooterComponent,
    ProductsCarruselComponent
  ]
})
export class SharedModule { }
