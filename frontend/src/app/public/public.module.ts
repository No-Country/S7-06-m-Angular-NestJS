import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PublicRoutingModule } from './public-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/loginPage/login.component';
import { RegisterComponent } from './register/registerPage/register.component';
import { RegisterFormComponent } from './register/components/register-form/register-form.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';

import { HomeModule } from './home/home.module';
import { StoreModule } from './store/store.module';
import { RecoverFormComponent } from './recover/components/recover-form/recover-form.component';
import { RecoverPasswordComponent } from './recover/page/recover-password/recover-password.component';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    RecoverPasswordComponent,
    RecoverFormComponent,
    PublicComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    StoreModule,
    HomeModule,
    SharedModule
  ]
})
export class PublicModule { }
