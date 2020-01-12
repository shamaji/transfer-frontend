import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/Service/UtilService.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ServerVariableService } from 'src/app/Service/serverVariable.service';
import { PaginationRequest } from 'src/app/Modal/PaginationRequest';
import { PaginationResponse } from 'src/app/Modal/PaginationResponse';
import { Deserialize } from 'cerialize';
declare var $: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transfer: any = {};
  transferList: any = [];
  type = 'add';
  // pagination
  paginationRequest = new PaginationRequest();
  paginationResponse = new PaginationResponse();
  searchText = '';
  constructor(public utils: UtilsService, public router: Router, public serverVar: ServerVariableService) { }

  ngOnInit() {
    this.getAllTransfer();
  }

  getAllTransfer() {
    this.transferList = [];
    if (this.paginationRequest.searchText) {
      this.paginationRequest.pageNumber = '1';
    }
    const param = {
      pageNumber: this.paginationRequest.pageNumber,
      noOfRecords: this.paginationRequest.noOfRecords,
      sortColumn: this.paginationRequest.sortColumn,
      sortOrder: this.paginationRequest.sortOrder,
      searchText: this.paginationRequest.searchText ? this.paginationRequest.searchText.toLowerCase() : undefined
    };
    this.utils.postMethodAPI(this.serverVar.TRANSFER_ALL, param, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.paginationResponse = Deserialize(response.data, PaginationResponse);
            this.transferList = this.paginationResponse.content; // response.data.content;
            if (this.paginationResponse.content && this.paginationResponse.content.length > 0) {
              this.paginationResponse = this.utils.setPaginationSetting(this.paginationResponse);
            }
          } else {
            this.utils.CreateNotification('error', 'Error!', 'Transfer Record not  found');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to get transfer records.');
        }
      }
    });
  }

  addModel() {
    $('#myModal').modal('show');
    this.transfer = {};
    this.type = 'add';
  }
  closeModel() {
    $('#myModal').modal('hide');
    this.transfer = {};
    this.type = 'add';
  }

  save() {
    const param = {
      jsonOfObject: this.transfer,
      pageNumber: this.paginationRequest.pageNumber,
      noOfRecords: this.paginationRequest.noOfRecords,
    };
    this.utils.postMethodAPI(this.serverVar.TRANSFER_ADD, param, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.closeModel();
            this.utils.CreateNotification('success', 'Success!', response.message);
            this.getAllTransfer();
          } else {
            this.utils.CreateNotification('error', 'Error!', 'save Transfer fails');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to save transfer records.');
        }
      }
    });
  }

  // view by id transfer
  getByIdTransfer(acc) {
    this.type = 'view';
    this.utils.getMethodAPI(this.serverVar.TRANSFER_BY_ID + '/' + acc.id, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.utils.CreateNotification('success', 'Success!', response.message);
            $('#myModal').modal('show');
            this.transfer = response.data;
          } else {
            this.utils.CreateNotification('error', 'Error!', 'Transfer Record by id not found');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to get transfer by id.');
        }
      }
    });
  }

  // edit transfer
  editTransfer(acc) {
    $('#myModal').modal('show');
    this.type = 'edit';
    this.transfer = acc;
  }
  update() {
    const id = this.transfer.id;
    if (this.transfer.id) {
      delete this.transfer.id;
      const param = {
        jsonOfObject: {
          accountHolderName: this.transfer.accountHolderName, bankName: this.transfer.bankName,
          accountNumber: this.transfer.accountNumber, amount: this.transfer.amount
        },
        pageNumber: this.paginationRequest.pageNumber,
        noOfRecords: this.paginationRequest.noOfRecords,
      };
      this.utils.putMethodAPI(this.serverVar.TRANSFER_UPDATE, param, id, (response) => {
        if (!this.utils.isNullUndefinedOrBlank(response)) {
          if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
            if (!this.utils.isNullUndefinedOrBlank(response.data)) {
              this.closeModel();
              this.utils.CreateNotification('success', 'Success!', response.message);
              this.getAllTransfer();
            } else {
              this.utils.CreateNotification('error', 'Error!', 'update Transfer fails');
            }
          } else {
            this.utils.CreateNotification('error', 'Error!', 'fails to update transfer records.');
          }
        }
      });
    } else {
      this.utils.CreateNotification('error', 'Error!', 'Update Id Not Found.');
    }
  }

  // delete transfer
  deleteTransfer(acc) {
    if (acc.id) {
      const id = acc.id;
      this.utils.deleteMethodAPI(this.serverVar.TRANSFER_DELETE, id, (response) => {
        if (!this.utils.isNullUndefinedOrBlank(response)) {
          if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
            this.closeModel();
            this.utils.CreateNotification('success', 'Success!', response.message);
            this.getAllTransfer();
          } else {
            this.utils.CreateNotification('error', 'Error!', 'fails to delete transfer records.');
          }
        }
      });
    } else {
      this.utils.CreateNotification('error', 'Error!', 'Delete Id Not Found.');
    }
  }

  dowloadPDF() {
    const columns = [
      { title: "Name", dataKey: "accountHolderName" }, { title: "Bank Name", dataKey: "bankName" },
      { title: "AccountNo", dataKey: "accountNumber" }, { title: "Amount", dataKey: "amount" }
    ];
    const rows = this.transferList;
    const doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('table.pdf');
  }

  /** start functions for pagination */
  getPreviousData() {
    this.utils.getPreviousData(this.paginationRequest);
    this.getAllTransfer();
  }
  getNextData() {
    this.utils.getNextData(this.paginationRequest);
    this.getAllTransfer();
  }

  changePage() {
    this.getAllTransfer();
  }

  changeNoOfRecord() {
    this.utils.changeNoOfRecord(this.paginationRequest);
    this.getAllTransfer();
  }
  /** end start functions for pagination */
}
