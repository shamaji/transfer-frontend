import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/Service/UtilService.service';
import { Router } from '@angular/router';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { ServerVariableService } from 'src/app/Service/serverVariable.service';
import { PaginationRequest } from 'src/app/Modal/PaginationRequest';
import { PaginationResponse } from 'src/app/Modal/PaginationResponse';
import { Deserialize } from 'cerialize';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/Service/ValidationService.service';
declare var $: any;

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {


  bankObj: any = {};
  bankTypeList: any = [];
  bankList: any = [];
  // pagination
  paginationRequest = new PaginationRequest();
  paginationResponse = new PaginationResponse();
  searchText = '';
  username = '';
  type = 'add';
  // transfer form-control
  bankForm: FormGroup;
  constructor(public utils: UtilsService, public router: Router, public serverVar: ServerVariableService
    , public fb: FormBuilder, public validationService: ValidationService) { }

  ngOnInit() {
    const user: any = this.utils.getUserDetails();
    if (!this.utils.isNullUndefinedOrBlank(user)) {
      this.username = user.userName;
    }
    this.getAllBankType();
    this.getAllBank();
    this.resetFormValidation();
    // this.paginationRequest.noOfRecordPerPageArray = this.paginationRequest.noOfRecordPerPageArrayAdmin;
  }

  resetFormValidation() {
    // login form-control property asignment
    this.bankForm = this.fb.group({
      bankName: [null, Validators.compose([Validators.required, Validators.pattern(this.validationService.ONLY_SPACE_AND_SPACIAL_CHARACTER_NOT_ALLOW)])],
      bankTypeName: [null, Validators.compose([Validators.required])]
    });
  }

  getAllBankType() {
    this.bankTypeList = [];
    this.utils.getMethodAPI(this.serverVar.BANK_TYPE_ALL, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.bankTypeList = response.data.tblBankType;
          } else {
            this.utils.CreateNotification('error', 'Error!', 'bank Record not  found');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to get bank records.');
        }
      }
    });
  }

  getAllBank() {
    this.bankList = [];
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
    // const param = {'jsonOfObject': {},'noOfRecords': 20, 'pageNumber': 1, 'searchText': '','sortColumn': '', 'sortOrder': ''};
    this.utils.postMethodAPI(this.serverVar.BANK_ALL, param, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.paginationResponse = Deserialize(response.data, PaginationResponse);
            // this.bankList = Deserialize(this.paginationResponse.content, Bank);
            this.bankList = this.paginationResponse.content; // response.data.content;
            if (this.paginationResponse.content && this.paginationResponse.content.length > 0) {
              this.paginationResponse = this.utils.setPaginationSetting(this.paginationResponse);
            }
          } else {
            this.utils.CreateNotification('error', 'Error!', 'bank Record not  found');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to get bank records.');
        }
      }
    });
  }

  addModel() {
    $('#myModal').modal('show');
    this.bankObj = {};
    this.type = 'add';
  }
  closeModel() {
    $('#myModal').modal('hide');
    this.bankObj = {};
    this.type = 'add';
  }

  save() {
    if (this.bankForm.valid) {
      const param = {
        jsonOfObject: this.bankObj,
        pageNumber: this.paginationRequest.pageNumber,
        noOfRecords: this.paginationRequest.noOfRecords,
      };
      this.utils.postMethodAPI(this.serverVar.BANK_ADD, param, (response) => {
        if (!this.utils.isNullUndefinedOrBlank(response)) {
          if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
            if (!this.utils.isNullUndefinedOrBlank(response.data)) {
              this.closeModel();
              this.utils.CreateNotification('success', 'Success!', response.message);
              this.getAllBank();
            } else {
              this.utils.CreateNotification('error', 'Error!', 'save bankObj fails');
            }
          } else {
            this.utils.CreateNotification('error', 'Error!', 'fails to save bankObj records.');
          }
        }
      });
    }
  }

  // view by id bankObj
  getByIdBank(bank, type) {
    if (type !== 'edit') {
      this.type = 'view';
    }
    this.utils.getMethodAPI(this.serverVar.BANK_BY_ID + '/' + bank.id, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.utils.CreateNotification('success', 'Success!', response.message);
            $('#myModal').modal('show');
            this.bankObj = response.data;
          } else {
            this.utils.CreateNotification('error', 'Error!', 'bankObj Record by id not found');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to get bankObj by id.');
        }
      }
    });
  }

  // edit bankObj
  editbank(bank) {
    $('#myModal').modal('show');
    this.type = 'edit';
    // this.bankObj = { bankName: bank.bankName, id: bank.id };
    this.getByIdBank(bank, 'edit');
  }
  update() {
    if (this.bankForm.valid) {
      const id = this.bankObj.id;
      if (this.bankObj.id) {
        delete this.bankObj.id;
        const param = {
          jsonOfObject: { bankName: this.bankObj.bankName, idOfBankType: this.bankObj.idOfBankType },
          pageNumber: this.paginationRequest.pageNumber,
          noOfRecords: this.paginationRequest.noOfRecords,
        };
        this.utils.putMethodAPI(this.serverVar.BANK_UPDATE, param, id, (response) => {
          if (!this.utils.isNullUndefinedOrBlank(response)) {
            if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
              if (!this.utils.isNullUndefinedOrBlank(response.data)) {
                this.closeModel();
                this.utils.CreateNotification('success', 'Success!', response.message);
                this.getAllBank();
              } else {
                this.utils.CreateNotification('error', 'Error!', 'update bankObj fails');
              }
            } else {
              this.utils.CreateNotification('error', 'Error!', 'fails to update bankObj records.');
            }
          }
        });
      } else {
        this.utils.CreateNotification('error', 'Error!', 'Update Id Not Found.');
      }
    }
  }

  // delete bank
  deleteBank(bank) {
    if (confirm()) {
      if (bank.id) {
        const id = bank.id;
        this.utils.deleteMethodAPI(this.serverVar.BANK_DELETE, id, (response) => {
          if (!this.utils.isNullUndefinedOrBlank(response)) {
            if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
              this.closeModel();
              this.utils.CreateNotification('success', 'Success!', response.message);
              this.getAllBank();
            } else {
              this.utils.CreateNotification('error', 'Error!', 'fails to delete bankObj records.');
            }
          }
        });
      } else {
        this.utils.CreateNotification('error', 'Error!', 'Delete Id Not Found.');
      }
    }
  }

  // dowloadPDF() {
  //   const columns = [{ title: "Bank Name", dataKey: "bankName" }];
  //   const rows = this.bankList;
  //   const doc = new jsPDF('p', 'pt');
  //   doc.autoTable(columns, rows);
  //   doc.save('table.pdf');
  // }

  /** start functions for pagination */
  getPreviousData() {
    this.utils.getPreviousData(this.paginationRequest);
    this.getAllBank();
  }
  getNextData() {
    this.utils.getNextData(this.paginationRequest);
    this.getAllBank();
  }

  changePage() {
    this.getAllBank();
  }

  changeNoOfRecord() {
    this.utils.changeNoOfRecord(this.paginationRequest);
    this.getAllBank();
  }
  /** end start functions for pagination */
}
