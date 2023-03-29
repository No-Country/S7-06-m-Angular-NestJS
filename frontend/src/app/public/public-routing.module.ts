import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/loginPage/login.component';
import { RegisterComponent } from './register/registerPage/register.component';

const routes: Routes = [
  {
    path: '', children:
      [        
        { path: 'home', component: HomeComponent },
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
        { path: '**', redirectTo: 'home', pathMatch: 'full' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
