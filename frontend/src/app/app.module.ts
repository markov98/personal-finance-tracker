import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
