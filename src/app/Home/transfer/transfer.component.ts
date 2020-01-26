import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/Service/UtilService.service';
import { Router } from '@angular/router';
import { ServerVariableService } from 'src/app/Service/serverVariable.service';
import { PaginationRequest } from 'src/app/Modal/PaginationRequest';
import { PaginationResponse } from 'src/app/Modal/PaginationResponse';
import { Deserialize, Serialize } from 'cerialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/Service/ValidationService.service';
import { Transfer } from 'src/app/Modal/Transfer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
declare var $: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  // transfer: any = {};
  // transferList: any = [];
  transfer: any = new Transfer();
  transferList = new Array<Transfer>();
  bankList: any = [];
  statusList: any = [];
  type = 'add';
  // pagination
  paginationRequest = new PaginationRequest();
  paginationResponse = new PaginationResponse();
  searchText = '';
  message = '';
  minDate = new Date();
  maxDate = new Date();
  fromDate = new Date();

  // transfer form-control
  transferForm: FormGroup;
  constructor(public utils: UtilsService, public router: Router, public serverVar: ServerVariableService
    , public fb: FormBuilder, public validationService: ValidationService) { }

  ngOnInit() {
    this.resetFormValidation();
    this.getAllBank();
    this.getAllTransfer();
  }

  resetFormValidation() {
    // login form-control property asignment
    this.transferForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.validationService.ONLY_SPACE_AND_SPACIAL_CHARACTER_NOT_ALLOW)])],
      bankName: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required, Validators.pattern(this.validationService.ONLY_NUMBERS_AND_DOT)])],
      accNo: [null, Validators.compose([Validators.required, Validators.pattern(this.validationService.ONLY_NUMBERS)])],
      pinCode: [null, Validators.compose([Validators.required, Validators.pattern(this.validationService.PATTERN_FOR_PINCODE)])],
      mobileNo: [null, Validators.compose([Validators.required, Validators.pattern(this.validationService.PATTERN_FOR_MOBILE)])]
    });
  }
  formTouched() {
    this.transferForm.controls.name.markAsTouched();
    this.transferForm.controls.bankName.markAsTouched();
    this.transferForm.controls.status.markAsTouched();
    this.transferForm.controls.amount.markAsTouched();
    this.transferForm.controls.accNo.markAsTouched();
    this.transferForm.controls.pinCode.markAsTouched();
    this.transferForm.controls.mobileNo.markAsTouched();
  }

  getAllBank() {
    this.bankList = [];
    this.statusList = [];
    this.utils.getMethodAPI(this.serverVar.TRANSFER_BANKS, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.bankList = response.data.tblBank;
            this.statusList = response.data.tblTransferStatus;
          } else {
            // this.utils.CreateNotification('error', 'Error!', 'bank Record not  found');
          }
        } else {
          // this.utils.CreateNotification('error', 'Error!', 'fails to get bank records.');
        }
      }
    });
  }

  getAllTransfer() {
    this.transferList = new Array<Transfer>();
    if (this.paginationRequest.searchText) {
      this.paginationRequest.pageNumber = '1';
    }
    const param = {
      pageNumber: this.paginationRequest.pageNumber,
      noOfRecords: this.paginationRequest.noOfRecords,
      sortColumn: this.paginationRequest.sortColumn, // createdDateTime
      sortOrder: this.paginationRequest.sortOrder,
      searchText: this.paginationRequest.searchText ? this.paginationRequest.searchText.toLowerCase() : undefined
    };
    this.utils.postMethodAPI(this.serverVar.TRANSFER_ALL, param, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.paginationResponse = Deserialize(response.data, PaginationResponse);
            this.transferList = Deserialize(response.data.content, Transfer); // this.paginationResponse.content;
            if (this.paginationResponse.content && this.paginationResponse.content.length > 0) {
              this.paginationResponse = this.utils.setPaginationSetting(this.paginationResponse);
            }
          } else {
            // this.utils.CreateNotification('error', 'Error!', 'Transfer Record not  found');
          }
        } else {
          // this.utils.CreateNotification('error', 'Error!', 'fails to get transfer records.');
        }
      }
    });
  }

  addModel() {
    $('#myModal').modal('show');
    this.transfer = new Transfer();
    this.type = 'add';
    this.resetFormValidation();
  }
  closeModel() {
    $('#myModal').modal('hide');
    this.transfer = new Transfer();
    this.type = 'add';
    this.transferForm.reset();
  }

  save() {
    this.transfer.transferDate = this.utils.dateYYYYMMDD(this.fromDate);
    if (this.transferForm.valid) {
      const param = {
        jsonOfObject: Serialize(this.transfer, Transfer), // this.transfer
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
              this.getAllTransfer();
            } else {
              this.utils.CreateNotification('error', 'Error!', 'save Transfer fails');
            }
          } else {
            this.utils.CreateNotification('error', 'Error!', 'fails to save transfer records.');
          }
        }
      });
    } else {
      this.formTouched();
    }
  }

  // get slip by id
  viewSlip(id) {
    this.router.navigate(['home/work_area/money-receipt/' + id]);
  }

  closeViewModel() {
    $('#viewModal').modal('hide');
    this.transfer = new Transfer();
    this.type = 'add';
  }
  // view by id transfer
  getByIdTransfer(acc) {
    this.type = 'view';
    this.utils.getMethodAPI(this.serverVar.TRANSFER_BY_ID + '/' + acc.id, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.utils.CreateNotification('success', 'Success!', response.message);
            $('#viewModal').modal('show');
            this.transfer = response.data;
            // this.transfer = Deserialize(response.data, Transfer); // response.data;
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
    this.transfer.idOfBank = acc.bank.id;
    this.transfer.idOfStatus = acc.status.id;
    this.fromDate = new Date(this.transfer.transferDate);
    // this.transfer = Serialize(acc, Transfer); // acc;
  }
  update() {
    this.transfer.transferDate = this.utils.dateYYYYMMDD(this.fromDate);
    if (this.transferForm.valid) {
      const dataObj = {
        slipNumber: this.transfer.slipNumber, transferDate: this.transfer.transferDate,
        accountHolderName: this.transfer.accountHolderName, idOfBank: this.transfer.idOfBank,
        idOfStatus: this.transfer.idOfStatus, accountNumber: this.transfer.accountNumber, amount: this.transfer.amount,
        pinNo: this.transfer.pinNo, mobileNo: this.transfer.mobileNo
      };
      const id = this.transfer.id;
      if (this.transfer.id) {
        delete this.transfer.id;
        const param = {
          jsonOfObject: dataObj, // Serialize(dataObj, Transfer),
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
  }

  // delete transfer
  deleteTransfer(acc) {
    if (acc.id) {
      if (confirm()) {
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
      }
    } else {
      this.utils.CreateNotification('error', 'Error!', 'Delete Id Not Found.');
    }
  }

  dowloadPDF() {
    this.transferList.forEach(element => {
      element['bankName'] = element.bank.bankName;
      element['name'] = element.status.name;
    });
    const columns = [ { title: "Slip Number", dataKey: "slipNumber" },{ title: "Date", dataKey: "transferDate" },
      { title: "Name", dataKey: "accountHolderName" }, { title: "Bank Name", dataKey: "bankName" },
      { title: "AccountNo", dataKey: "accountNumber" }, { title: "Amount", dataKey: "amount" }
      , { title: "Mobile", dataKey: "mobileNo" }, { title: "Status", dataKey: "name" }
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

  sorting(value, field) {
    if (value) {
      this.paginationRequest.sortOrder = 'a';
    } else {
      this.paginationRequest.sortOrder = 'd';
    }
    this.paginationRequest.sortColumn = field; // createdDateTime
    // this.utils.changeNoOfRecord(this.paginationRequest);
    this.getAllTransfer();
  }
  /** end start functions for pagination */
}
