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
  repoertList: any = [];
  // OPEN("Open"), PENDING("Pending"), CONFIRM("Confirm"), CANCEL("Cancel");
  constructor(public utils: UtilsService, public router: Router, public serverVar: ServerVariableService) { }

  ngOnInit() {
    const user: any = this.utils.getUserDetails();
    if (!this.utils.isNullUndefinedOrBlank(user)) {
      this.username = user.userName;
    }
    this.getAllTransferDashboardReport();
  }


  getAllTransferDashboardReport() {
    this.repoertList = [];
    this.utils.getMethodAPI(this.serverVar.TRANSFER_DASH_REPORT, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            console.log(response.data);
            this.repoertList = response.data;
            console.log('this.repoertList ', this.repoertList);
          } else {
            // this.utils.CreateNotification('error', 'Error!', 'bank Record not  found');
          }
        } else {
          // this.utils.CreateNotification('error', 'Error!', 'fails to get bank records.');
        }
      }
    });
  }

}
