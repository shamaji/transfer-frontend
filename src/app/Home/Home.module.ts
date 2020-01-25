import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BankComponent } from './bank/bank.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TransferComponent } from './transfer/transfer.component';
import { MoneyReceiptComponent } from './money-receipt/money-receipt.component';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BanktypeComponent } from './banktype/banktype.component';
import { TransfStatusComponent } from './transf-status/transf-status.component';

const routes: Routes = [
    { path: '', redirectTo: 'work_area', pathMatch: 'full' },
    {
        path: 'work_area', component: HomeComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'transfer', component: TransferComponent },
            { path: 'bank', component: BankComponent },
            { path: 'banktype', component: BanktypeComponent },
            { path: 'money-receipt/:id', component: MoneyReceiptComponent },
            { path: 'transfer-status', component: TransfStatusComponent },
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule', data: { preload: true } },
        ]
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent,
        LeftMenuComponent,
        HeaderComponent,
        BankComponent,
        BanktypeComponent,
        TransferComponent,
        MoneyReceiptComponent,
        TransfStatusComponent,
        ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        NgSelectModule,
        // BsDatepickerModule.forRoot()
    ],
    providers: [],
    bootstrap: []
})
export class HomeModule { }
