import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdProductComponent } from './components/id-product/id-product.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { StoreComponent } from './page/store.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    IdProductComponent,
    AllProductsComponent,
    StoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StoreModule { }
