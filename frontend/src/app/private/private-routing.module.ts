import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/page/cart/cart.component';
import { PrivateComponent } from './private.component';
import { ProfileComponent } from './user/page/profile/profile.component';
import { EditProfileComponent } from './user/page/edit-profile/edit-profile.component';
import { PaymentComponent } from './payment/payment.component';
import { WireTransferDataComponent } from './payment/components/wire-transfer-data/wire-transfer-data.component';

const routes: Routes = [
  {
    path: '',component:PrivateComponent,
    children: [
      { path: 'banking', component: WireTransferDataComponent},
      { path: 'checkout', component: PaymentComponent},
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: ProfileComponent},
      { path: 'edit-profile', component: EditProfileComponent},
      { path: '**', redirectTo: 'home' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
