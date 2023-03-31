import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/loginPage/login.component';
import { RegisterComponent } from './register/registerPage/register.component';
import { RegisterFormComponent } from './register/components/register-form/register-form.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { StoreModule } from './store/store.module';

import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { RecoverFormComponent } from './recover/components/recover-form/recover-form.component';
import { RecoverPasswordComponent } from './recover/page/recover-password/recover-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    RecoverPasswordComponent,
    RecoverFormComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    StoreModule,
    HomeModule,
    SharedModule
  ]
})
export class PublicModule { }
