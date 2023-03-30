import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PublicRoutingModule } from './public-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/loginPage/login.component';
import { RegisterComponent } from './register/registerPage/register.component';
import { RegisterFormComponent } from './register/components/register-form/register-form.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { StoreModule } from './store/store.module';

import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterFormComponent,
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    StoreModule,
    HomeModule,
  ]
})
export class PublicModule { }
