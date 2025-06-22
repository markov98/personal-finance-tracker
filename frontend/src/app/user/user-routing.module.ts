import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginRedirect } from '../guards/redirect-login.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginRedirect] },
    { path: 'signup', component: SignupComponent, canActivate: [LoginRedirect] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }