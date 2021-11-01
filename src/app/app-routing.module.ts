/*
============================================
; Title:  app-routing.module.ts
; Author: Soliman Elmalak
; Date:   27 October 2021
; Description: app-routing.module
============================================
*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AuthLayoutComponent} from './shared/auth-layout/auth-layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
      children: [
        {
          path: '',
          component: HomeComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'home',
          component: HomeComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'contact',
          component: ContactComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'about',
          component: AboutComponent,
          canActivate: [AuthGuard],
        },
      ]
   },
   {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


