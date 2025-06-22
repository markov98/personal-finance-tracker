import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './core/error/error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }