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
  selector: 'app-banktype',
  templateUrl: './banktype.component.html',
  styleUrls: ['./banktype.component.css']
})
export class BanktypeComponent implements OnInit {

  bankTypeObj: any = {};
  bankTypeList: any = [];
  // pagination
  paginationRequest = new PaginationRequest();
  paginationResponse = new PaginationResponse();
  searchText = '';
  type = 'add';
  // transfer form-control
  bankTypeForm: FormGroup;
  constructor(public utils: UtilsService, public router: Router, public serverVar: ServerVariableService
    , public fb: FormBuilder, public validationService: ValidationService) { }

  ngOnInit() {
    this.getAllBankType();
    this.resetFormValidation();
    // this.paginationRequest.noOfRecordPerPageArray = this.paginationRequest.noOfRecordPerPageArrayAdmin;
  }

  resetFormValidation() {
    this.bankTypeForm = this.fb.group({
      bankTypeName: [null, Validators.compose([Validators.required, Validators.pattern(this.validationService.ONLY_SPACE_AND_SPACIAL_CHARACTER_NOT_ALLOW)])]
    });
  }

  getAllBankType() {
    this.bankTypeList = [];
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
    this.utils.postMethodAPI(this.serverVar.BANK_TYPE_GET_ALL, param, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.paginationResponse = Deserialize(response.data, PaginationResponse);
            this.bankTypeList = this.paginationResponse.content; // response.data.content;
            if (this.paginationResponse.content && this.paginationResponse.content.length > 0) {
              this.paginationResponse = this.utils.setPaginationSetting(this.paginationResponse);
            }
          } else {
            // this.utils.CreateNotification('error', 'Error!', 'bank Record not  found');
          }
        } else {
          // this.utils.CreateNotification('error', 'Error!', 'fails to get bank records.');
        }
      }
    });
  }

  addModel() {
    $('#myModal').modal('show');
    this.bankTypeObj = {};
    this.type = 'add';
  }
  closeModel() {
    $('#myModal').modal('hide');
    this.bankTypeObj = {};
    this.type = 'add';
  }

  save() {
    if (this.bankTypeForm.valid) {
      const param = {
        jsonOfObject: this.bankTypeObj,
        pageNumber: this.paginationRequest.pageNumber,
        noOfRecords: this.paginationRequest.noOfRecords,
      };
      this.utils.postMethodAPI(this.serverVar.BANK_TYPE_ADD, param, (response) => {
        if (!this.utils.isNullUndefinedOrBlank(response)) {
          if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
            if (!this.utils.isNullUndefinedOrBlank(response.data)) {
              this.closeModel();
              this.utils.CreateNotification('success', 'Success!', response.message);
              this.getAllBankType();
            } else {
              this.utils.CreateNotification('error', 'Error!', 'save bankTypeObj fails');
            }
          } else {
            this.utils.CreateNotification('error', 'Error!', 'fails to save bankTypeObj records.');
          }
        }
      });
    }
  }

  // view by id bankTypeObj
  getByIdBank(bank, type) {
    if (type !== 'edit') {
      this.type = 'view';
    }
    this.utils.getMethodAPI(this.serverVar.BANK_TYPE_BY_ID + '/' + bank.id, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.utils.CreateNotification('success', 'Success!', response.message);
            $('#myModal').modal('show');
            this.bankTypeObj = response.data;
          } else {
            this.utils.CreateNotification('error', 'Error!', 'bankTypeObj Record by id not found');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to get bankTypeObj by id.');
        }
      }
    });
  }

  // edit bankTypeObj
  editbank(bank) {
    $('#myModal').modal('show');
    this.type = 'edit';
    // this.bankTypeObj = { bankTypeName: bank.bankTypeName, id: bank.id };
    this.getByIdBank(bank, 'edit');
  }
  update() {
    if (this.bankTypeForm.valid) {
      const id = this.bankTypeObj.id;
      if (this.bankTypeObj.id) {
        delete this.bankTypeObj.id;
        const param = {
          jsonOfObject: { bankTypeName: this.bankTypeObj.bankTypeName },
          pageNumber: this.paginationRequest.pageNumber,
          noOfRecords: this.paginationRequest.noOfRecords,
        };
        this.utils.putMethodAPI(this.serverVar.BANK_TYPE_UPDATE, param, id, (response) => {
          if (!this.utils.isNullUndefinedOrBlank(response)) {
            if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
              if (!this.utils.isNullUndefinedOrBlank(response.data)) {
                this.closeModel();
                this.utils.CreateNotification('success', 'Success!', response.message);
                this.getAllBankType();
              } else {
                this.utils.CreateNotification('error', 'Error!', 'update bankTypeObj fails');
              }
            } else {
              this.utils.CreateNotification('error', 'Error!', 'fails to update bankTypeObj records.');
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
        this.utils.deleteMethodAPI(this.serverVar.BANK_TYPE_DELETE, id, (response) => {
          if (!this.utils.isNullUndefinedOrBlank(response)) {
            if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
              this.closeModel();
              this.utils.CreateNotification('success', 'Success!', response.message);
              this.getAllBankType();
            } else {
              this.utils.CreateNotification('error', 'Error!', 'fails to delete bankTypeObj records.');
            }
          }
        });
      } else {
        this.utils.CreateNotification('error', 'Error!', 'Delete Id Not Found.');
      }
    }
  }

  // dowloadPDF() {
  //   const columns = [{ title: "Bank Name", dataKey: "bankTypeName" }];
  //   const rows = this.bankTypeList;
  //   const doc = new jsPDF('p', 'pt');
  //   doc.autoTable(columns, rows);
  //   doc.save('table.pdf');
  // }

  /** start functions for pagination */
  getPreviousData() {
    this.utils.getPreviousData(this.paginationRequest);
    this.getAllBankType();
  }
  getNextData() {
    this.utils.getNextData(this.paginationRequest);
    this.getAllBankType();
  }

  changePage() {
    this.getAllBankType();
  }

  changeNoOfRecord() {
    this.utils.changeNoOfRecord(this.paginationRequest);
    this.getAllBankType();
  }
  /** end start functions for pagination */

}
