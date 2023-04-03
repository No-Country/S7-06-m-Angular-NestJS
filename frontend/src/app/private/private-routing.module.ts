import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/page/cart/cart.component';
import { PrivateComponent } from './private/private.component';
import { ResetPasswordComponent } from './reset-password/page/reset-password/reset-password.component';
import { ProfileComponent } from './user/page/profile/profile.component';
import { EditProfileComponent } from './user/page/edit-profile/edit-profile.component';

const routes: Routes = [  
  {
    path: '',component:PrivateComponent,
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'resetpassword/:token?', component: ResetPasswordComponent },
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
