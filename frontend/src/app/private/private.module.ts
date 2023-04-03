import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { CartModule } from './cart/cart.module';
import { PrivateComponent } from './private/private.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordFormComponent } from './reset-password/components/reset-password-form/reset-password-form.component';
import { ResetPasswordComponent } from './reset-password/page/reset-password/reset-password.component';
import { ProfileComponent } from './user/page/profile/profile.component';

@NgModule({
  declarations: [ 
    PrivateComponent, ResetPasswordComponent, ResetPasswordFormComponent,ProfileComponent
  ],
  imports: [
    CommonModule,
    CartModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
