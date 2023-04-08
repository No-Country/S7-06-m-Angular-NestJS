import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PublicModule } from './public/public.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateModule } from './private/private.module';
import { interceptorProvider } from './shared/interceptors/interceptor.service';
import { PublicRoutingModule } from './public/public-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicRoutingModule,
    NgbModule,
    HttpClientModule,
    PublicModule,
    PrivateModule,
    BrowserAnimationsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
