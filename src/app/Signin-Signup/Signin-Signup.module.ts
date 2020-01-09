import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/Shared.module';
import { FormsModule } from "@angular/forms";


const routes: Routes = [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'sign-up', component: SignUpComponent},
    { path: 'sign-in', component: SignInComponent},
];

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule
    ],
    providers: [],
    bootstrap: []
})
export class SignInSignUpModule { }
