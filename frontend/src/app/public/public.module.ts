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
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from './store/store.module';
import { RecoverFormComponent } from './recover/components/recover-form/recover-form.component';
import { RecoverPasswordComponent } from './recover/page/recover-password/recover-password.component';
import { PublicComponent } from './public/public.component';

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
    CommonModule,
    HttpClientModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    StoreModule,
    HomeModule,
  ]
})
export class PublicModule { }
