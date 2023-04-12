import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { IdProductComponent } from './components/id-product/id-product.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { StoreComponent } from './page/store.component';
import { PublicRoutingModule } from '../public-routing.module';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    StoreComponent,
    AllProductsComponent,
    IdProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    PublicRoutingModule
  ]
})
export class StoreModule { }
