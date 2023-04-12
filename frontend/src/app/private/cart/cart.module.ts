import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductsComponent } from './components/cart-products/cart-products.component';
import { CartComponent } from './page/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { SelectorComponent } from './components/selector/selector.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    CartProductsComponent,
    CartComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
