import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/Service/UtilService.service';
import { ServerVariableService } from 'src/app/Service/serverVariable.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-money-receipt',
  templateUrl: './money-receipt.component.html',
  styleUrls: ['./money-receipt.component.css']
})
export class MoneyReceiptComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;
  transfer: any = {};
  constructor(public utils: UtilsService, public router: Router, public route: ActivatedRoute, public serverVar: ServerVariableService) {
    this.route.params.subscribe(params => {
      if (!this.utils.isEmptyObject(params)) {
        console.log(params);
        if (params.id) {
          this.getByIdTransfer(params.id);
        }
      }
    });
  }

  ngOnInit() {
  }

  // view by id transfer
  getByIdTransfer(accId) {
    this.utils.getMethodAPI(this.serverVar.TRANSFER_BY_ID + '/' + accId, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.utils.CreateNotification('success', 'Success!', response.message);
            this.transfer = response.data;
            console.log(this.transfer);
          } else {
            this.utils.CreateNotification('error', 'Error!', 'Transfer Record by id not found');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to get transfer by id.');
        }
      }
    });
  }

  downloadPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('money_receipt.pdf'); // Generated PDF
    });
  }

}
