import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerVariableService {

  constructor() { }
  defaultUserName = 'Default';
  LOCAL_STORAGE_FOR_USER_DETAIL = 'userDetails';

  // Login API
  LOGIN = 'login';
  CUSTOMER = 'customers'; // GET - https://umeshbackend.herokuapp.com/api/customers

  // Transfer api
  TRANSFER_ALL = 'transfer/lazzyLoadingForTransfer'; // GET https://umeshbackend.herokuapp.com/api/transfer/getAll
  TRANSFER_ADD = 'transfer/saveTransfer'; //  https://umeshbackend.herokuapp.com/api/transfer/saveTransfer
  TRANSFER_BY_ID = 'transfer/getTransferById';
  TRANSFER_UPDATE = 'transfer/updateTransfer';
  TRANSFER_DELETE = 'transfer/deleteTransferById';
  TRANSFER_BANKS = 'transfer/getAllDropDownDataForCreateTransferForm';
  BANK_TYPE_ALL = 'bank/getAllDropDownDataForCreateBankForm'; // GET https://umeshbackend.herokuapp.com/api/banktype/getAll
  BANK_ALL = 'bank/lazzyLoadingForBank'; // GET https://umeshbackend.herokuapp.com/api/bank/getAll
  BANK_BY_ID = 'bank/getBankById'; // GET https://umeshbackend.herokuapp.com/api/bank/getBankById/111
  BANK_ADD = 'bank/saveBank'; // GET https://umeshbackend.herokuapp.com/api/bank/saveBank
  BANK_UPDATE = 'bank/updateBank'; // GET https://umeshbackend.herokuapp.com/api/bank/updateBank
  BANK_DELETE = 'bank/deleteBankById'; // GET https://umeshbackend.herokuapp.com/api/bank/deleteBankById

}
