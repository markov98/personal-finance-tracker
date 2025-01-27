import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ]
})
export class AppModule { }
