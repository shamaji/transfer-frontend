import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
  { path: 'sign-up', loadChildren: '../Signin-Signup/Signin-Signup.module#SignInSignUpModule', data: { preload: true } },
  { path: 'home', loadChildren: '../Home/Home.module#HomeModule',  data: {preload: true} }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
