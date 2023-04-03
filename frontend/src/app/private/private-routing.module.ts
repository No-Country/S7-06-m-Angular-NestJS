import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartProductsComponent } from './cart/components/cart-products/cart-products.component';
import { CartComponent } from './cart/page/cart/cart.component';
import { PrivateComponent } from './private/private.component';
import { ResetPasswordComponent } from './reset-password/page/reset-password/reset-password.component';

const routes: Routes = [  
  {
    path: '',component:PrivateComponent,
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'resetpassword/:token?', component: ResetPasswordComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
