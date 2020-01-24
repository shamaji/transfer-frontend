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

  // dashboard api
  TRANSFER_DASH_REPORT = 'transfer/getTransferDetailsForClientDashboard';
  // https://umeshbackend.herokuapp.com/api/transfer/getTransferDetailsForClientDashboard

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

  BANK_TYPE_GET_ALL = 'banktype/lazzyLoadingForBankType';
  BANK_TYPE_BY_ID = 'banktype/getBankTypeById';
  BANK_TYPE_ADD = 'banktype/saveBankType';
  BANK_TYPE_UPDATE = 'banktype/updateBankType';
  BANK_TYPE_DELETE = 'banktype/deleteBankTypeById';

  STATUS_GET_ALL = 'transferstatus/lazzyLoadingForTransferStatus';
  STATUS_BY_ID = 'transferstatus/getTransferStatusById';
  STATUS_ADD = 'transferstatus/saveTransferStatus';
  STATUS_UPDATE = 'transferstatus/updateTransferStatus';
  STATUS_DELETE = 'transferstatus/deleteTransferStatusById';

}
