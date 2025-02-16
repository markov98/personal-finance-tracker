import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { appInterceptorProvider } from './app.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [provideHttpClient(), appInterceptorProvider],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
