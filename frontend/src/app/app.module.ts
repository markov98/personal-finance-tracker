import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from './app.interceptor';
import { AuthMenuComponent } from './auth-menu/auth-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthMenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), httpInterceptorProviders],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
