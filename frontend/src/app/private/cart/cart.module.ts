import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductsComponent } from './components/cart-products/cart-products.component';
import { CartComponent } from './page/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { SelectorComponent } from './components/selector/selector.component';

@NgModule({
  declarations: [
    CartProductsComponent,
    CartComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
