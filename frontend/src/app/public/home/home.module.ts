import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './pages/home.component';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { 

}
