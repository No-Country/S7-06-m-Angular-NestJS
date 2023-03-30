import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/pages/home.component';
import { LoginComponent } from './login/loginPage/login.component';
import { RegisterComponent } from './register/registerPage/register.component';
import { StoreComponent } from './store/page/store.component';
import { AllProductsComponent } from './store/components/all-products/all-products.component';
import { IdProductComponent } from './store/components/id-product/id-product.component';

const routes: Routes = [
  {
    path: '',  children:
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
        { path: 'store', component: StoreComponent, children: [
            { path: '', component: AllProductsComponent },
            { path: 'product', component: IdProductComponent },
            { path: 'category', component: AllProductsComponent }
          ]
        },
        { path: '**', redirectTo: 'home', pathMatch: 'full' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
