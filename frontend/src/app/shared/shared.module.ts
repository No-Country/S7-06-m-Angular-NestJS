import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsCarruselComponent } from './components/products-carrusel/products-carrusel.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { AdminGuardGuard } from './guards/admin-guard.guard';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    ProductsCarruselComponent,
    LoadingComponent  
  ],
  imports: [
    CommonModule,
    SwiperModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule
    NgxPayPalModule
  ],
  exports: [
    SwiperModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    NavBarComponent,
    FooterComponent,
    ProductsCarruselComponent,
    LoadingComponent,
    NgxPayPalModule
  ],
  providers: [
    AdminGuardGuard // registra el guard en el módulo
  ],
  
})
export class SharedModule { }
