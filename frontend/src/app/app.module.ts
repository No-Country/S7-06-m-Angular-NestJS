import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PublicModule } from './public/public.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateModule } from './private/private.module';
import { interceptorProvider } from './shared/interceptors/interceptor/interceptor.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { PublicRoutingModule } from './public/public-routing.module';
import { LoadingInterceptor } from './shared/interceptors/loading/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PublicRoutingModule,
    SharedModule,
    NgbModule,
    PublicModule,
    PrivateModule,
    BrowserAnimationsModule
  ],
  providers: [
    interceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
