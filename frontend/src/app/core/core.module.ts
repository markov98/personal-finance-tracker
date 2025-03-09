import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthMenuComponent } from './auth-menu/auth-menu.component';



@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    AuthMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
