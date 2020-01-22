import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/Service/UtilService.service';
import { Router } from '@angular/router';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { ServerVariableService } from 'src/app/Service/serverVariable.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = '';
  constructor(public utils: UtilsService, public router: Router, public serverVar: ServerVariableService) { }

  ngOnInit() {
    const user: any = this.utils.getUserDetails();
    if (!this.utils.isNullUndefinedOrBlank(user)) {
      this.username = user.userName;
    }
  }

}
