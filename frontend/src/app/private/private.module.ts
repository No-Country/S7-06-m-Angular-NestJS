import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { CartModule } from './cart/cart.module';
import { PrivateComponent } from './private/private.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './user/page/profile/profile.component';

@NgModule({
  declarations: [ 
    PrivateComponent, ProfileComponent,
  ],
  imports: [
    CommonModule,
    CartModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
