import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [ErrorComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
