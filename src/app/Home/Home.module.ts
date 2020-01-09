import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BankComponent } from './bank/bank.component';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
    { path: '', redirectTo: 'work_area', pathMatch: 'full' },
    {
        path: 'work_area', component: HomeComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'bank', component: BankComponent },
        ]
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent,
        LeftMenuComponent,
        HeaderComponent,
        BankComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        NgSelectModule
    ],
    providers: [],
    bootstrap: []
})
export class HomeModule { }
