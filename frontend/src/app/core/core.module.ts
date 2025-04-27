import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthMenuComponent } from './auth-menu/auth-menu.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    AuthMenuComponent,
    AuthenticateComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent
  ]
})
export class CoreModule { }
