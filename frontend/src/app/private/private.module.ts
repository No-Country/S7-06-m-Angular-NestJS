import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { CartModule } from './cart/cart.module';
import { PrivateComponent } from './private/private.component';

@NgModule({
  declarations: [ 
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    CartModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
