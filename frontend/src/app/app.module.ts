import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
