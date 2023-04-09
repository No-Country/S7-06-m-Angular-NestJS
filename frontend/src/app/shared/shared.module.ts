import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsCarruselComponent } from './components/products-carrusel/products-carrusel.component';
import { SwiperModule } from 'swiper/angular';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ProductsCarruselComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SwiperModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    
    NavBarComponent,
    FooterComponent,
    ProductsCarruselComponent

  ]
})
export class SharedModule { }
