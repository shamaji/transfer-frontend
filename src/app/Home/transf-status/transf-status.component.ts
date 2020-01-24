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
  selector: 'app-transf-status',
  templateUrl: './transf-status.component.html',
  styleUrls: ['./transf-status.component.css']
})
export class TransfStatusComponent implements OnInit {

  statusObj: any = {};
  statusList: any = [];
  // pagination
  paginationRequest = new PaginationRequest();
  paginationResponse = new PaginationResponse();
  searchText = '';
  type = 'add';
  // transfer status form-control
  statusForm: FormGroup;
  constructor(public utils: UtilsService, public router: Router, public serverVar: ServerVariableService
    , public fb: FormBuilder, public validationService: ValidationService) { }

  ngOnInit() {
    this.getAllStatus();
    this.resetFormValidation();
    // this.paginationRequest.noOfRecordPerPageArray = this.paginationRequest.noOfRecordPerPageArrayAdmin;
  }

  resetFormValidation() {
    this.statusForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(this.validationService.ONLY_SPACE_AND_SPACIAL_CHARACTER_NOT_ALLOW)])]
    });
  }

  getAllStatus() {
    this.statusList = [];
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
    this.utils.postMethodAPI(this.serverVar.STATUS_GET_ALL, param, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.paginationResponse = Deserialize(response.data, PaginationResponse);
            this.statusList = this.paginationResponse.content; // response.data.content;
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
    this.statusObj = {};
    this.type = 'add';
  }
  closeModel() {
    $('#myModal').modal('hide');
    this.statusObj = {};
    this.type = 'add';
  }

  save() {
    if (this.statusForm.valid) {
      const param = {
        jsonOfObject: this.statusObj,
        pageNumber: this.paginationRequest.pageNumber,
        noOfRecords: this.paginationRequest.noOfRecords,
      };
      this.utils.postMethodAPI(this.serverVar.STATUS_ADD, param, (response) => {
        if (!this.utils.isNullUndefinedOrBlank(response)) {
          if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
            if (!this.utils.isNullUndefinedOrBlank(response.data)) {
              this.closeModel();
              this.utils.CreateNotification('success', 'Success!', response.message);
              this.getAllStatus();
            } else {
              this.utils.CreateNotification('error', 'Error!', 'save statusObj fails');
            }
          } else {
            this.utils.CreateNotification('error', 'Error!', 'fails to save statusObj records.');
          }
        }
      });
    }
  }

  // view by id statusObj
  getByIdStatus(bank, type) {
    if (type !== 'edit') {
      this.type = 'view';
    }
    this.utils.getMethodAPI(this.serverVar.STATUS_BY_ID + '/' + bank.id, (response) => {
      if (!this.utils.isNullUndefinedOrBlank(response)) {
        if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
          if (!this.utils.isNullUndefinedOrBlank(response.data)) {
            this.utils.CreateNotification('success', 'Success!', response.message);
            $('#myModal').modal('show');
            this.statusObj = response.data;
          } else {
            this.utils.CreateNotification('error', 'Error!', 'statusObj Record by id not found');
          }
        } else {
          this.utils.CreateNotification('error', 'Error!', 'fails to get statusObj by id.');
        }
      }
    });
  }

  // edit statusObj
  editStatus(bank) {
    $('#myModal').modal('show');
    this.type = 'edit';
    // this.statusObj = { name: bank.name, id: bank.id };
    this.getByIdStatus(bank, 'edit');
  }
  update() {
    if (this.statusForm.valid) {
      const id = this.statusObj.id;
      if (this.statusObj.id) {
        delete this.statusObj.id;
        const param = {
          jsonOfObject: { name: this.statusObj.name },
          pageNumber: this.paginationRequest.pageNumber,
          noOfRecords: this.paginationRequest.noOfRecords,
        };
        this.utils.putMethodAPI(this.serverVar.STATUS_UPDATE, param, id, (response) => {
          if (!this.utils.isNullUndefinedOrBlank(response)) {
            if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
              if (!this.utils.isNullUndefinedOrBlank(response.data)) {
                this.closeModel();
                this.utils.CreateNotification('success', 'Success!', response.message);
                this.getAllStatus();
              } else {
                this.utils.CreateNotification('error', 'Error!', 'update statusObj fails');
              }
            } else {
              this.utils.CreateNotification('error', 'Error!', 'fails to update statusObj records.');
            }
          }
        });
      } else {
        this.utils.CreateNotification('error', 'Error!', 'Update Id Not Found.');
      }
    }
  }

  // delete bank
  deleteStatus(status) {
    if (confirm()) {
      if (status.id) {
        const id = status.id;
        this.utils.deleteMethodAPI(this.serverVar.STATUS_DELETE, id, (response) => {
          if (!this.utils.isNullUndefinedOrBlank(response)) {
            if (!this.utils.isNullUndefinedOrBlank(response.status) && (response.status === 200 || response.status === 201)) {
              this.closeModel();
              this.utils.CreateNotification('success', 'Success!', response.message);
              this.getAllStatus();
            } else {
              this.utils.CreateNotification('error', 'Error!', 'fails to delete statusObj records.');
            }
          }
        });
      } else {
        this.utils.CreateNotification('error', 'Error!', 'Delete Id Not Found.');
      }
    }
  }

  // dowloadPDF() {
  //   const columns = [{ title: "Status Name", dataKey: "name" }];
  //   const rows = this.statusList;
  //   const doc = new jsPDF('p', 'pt');
  //   doc.autoTable(columns, rows);
  //   doc.save('table.pdf');
  // }

  /** start functions for pagination */
  getPreviousData() {
    this.utils.getPreviousData(this.paginationRequest);
    this.getAllStatus();
  }
  getNextData() {
    this.utils.getNextData(this.paginationRequest);
    this.getAllStatus();
  }

  changePage() {
    this.getAllStatus();
  }

  changeNoOfRecord() {
    this.utils.changeNoOfRecord(this.paginationRequest);
    this.getAllStatus();
  }
  /** end start functions for pagination */

}
