import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './App-Routing/app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './Shared/Shared.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgSelectModule } from '@ng-select/ng-select';
import {DpDatePickerModule} from 'ng2-date-picker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    // SharedModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    DpDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
