import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './pages/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { NotepadsCarruselComponent } from './components/notepads-carrusel/notepads-carrusel.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    NotepadsCarruselComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { 

}
