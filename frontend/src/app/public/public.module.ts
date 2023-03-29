import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/loginPage/login.component';
import { RegisterComponent } from './register/registerPage/register.component';
import { RegisterFormComponent } from './register/components/register-form/register-form.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterFormComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
