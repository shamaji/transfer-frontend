import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: AdminDashboardComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
