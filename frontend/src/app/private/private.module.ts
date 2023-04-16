import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { CartModule } from './cart/cart.module';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './user/page/profile/profile.component';
import { EditProfileComponent } from './user/page/edit-profile/edit-profile.component';
import { EditProfileFormComponent } from './user/components/edit-profile-form/edit-profile-form.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentMethodsComponent } from './payment/components/payment-methods/payment-methods.component';
import { PaymentResumeComponent } from './payment/components/payment-resume/payment-resume.component';


@NgModule({
  declarations: [
    PrivateComponent,
    ProfileComponent, 
    EditProfileComponent, 
    EditProfileFormComponent, 
    PaymentComponent, 
    PaymentMethodsComponent, 
    PaymentResumeComponent
  ],
  imports: [
    CommonModule,
    CartModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
