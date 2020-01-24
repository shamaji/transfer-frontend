import { Router } from '@angular/router';
// import { Deserialize } from 'cerialize';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { isDate } from 'util';
import { ValidationService } from './ValidationService.service';
import { NotificationsService } from 'angular2-notifications';
import { ResponseWrapperDTO } from '../Modal/Response/ResponseWrapperDTO';
import { Deserialize } from 'cerialize';
import { RouteVariableService } from './routeVariable.service';
import { StorageListnerService } from './storage-listner.service';
import { ServerVariableService } from './serverVariable.service';
import { LanguageService } from './language.service';
import { EncrDecrService } from './Encr-Decr.service';
import { PaginationRequest } from '../Modal/PaginationRequest';
import { PaginationResponse } from '../Modal/PaginationResponse';
// import { NotificationModel } from '../model/NotificationModel';

declare var $;

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    // URL = 'http://192.168.2.161:1010/'; // neel url
    URL = 'https://umeshbackend.herokuapp.com/'; // live url
    APIStartWith = 'api/';
    SERVER_URL = this.URL;

    usersList: any = [];
    user: any = {};

    SUCCESS_REPONSE = 'SUCCESS';
    UNAPPLICABLE = 'UNAPPLICABLE';
    FAIL_REPONSE = 'FAIL';

    Pos = 0;
    imagePreview: any;
    dateFormate = 'dd-MM-yyyy';
    loaderStart = 0;

    isAllowRoutes = [
        this.serverVariableService.CUSTOMER,
        this.serverVariableService.TRANSFER_ALL,
        this.serverVariableService.TRANSFER_ADD
    ];

    serverResponse = new ResponseWrapperDTO();
    printNullValue = '-';
    emailVerifyMessage = '';
    serverDownUrl = '-';
    isServerDown: Boolean = false;
    isUnAuthorise: Boolean = false;
    printNull = 'NULL';
    maxRecordSelect = 50; // will set maximum record selection in add to cartlist, wishlist, make offer etc.
    showPopup = false; // if true then it will display popup to user when come on dhasboard first time after login
    showFillUpForm = false; // if true then it will display popup to user when come on dhasboard first time after login
    isViewFeaturesStone = false; // display features stone to user dhashboard from diamond view click on tag features stone
    isViewSalesExecutive = false; // display sales executive to user dashboard from diamond view click on tag sales executive  -- savan
    redirectMessage = 'Are you Sure Want to Leave Search Result Page.';
    userNotificationCounter = 0;
    adminNotificationCounter = 0;
    userDataLoaded: boolean;
    adminDataLoaded: boolean;
    // party name and salse person name for shivam db -- Shwebapi
    partyNameShwebapi = '';
    SalsePersonShwebapi = '';
    noPartyError = 'Sorry, You have not party, please contact to admin.';
    searchTabIsAdding = false; // check wheather it adding or removind tabl multiple search.
    isShowMessageForLoginSuccess = false; // when user gets login at that time set it true;
    loginSuccessMessage = ''; // set login success message dislay when comes to dashboard
    // isFromProfileToCreateDemand = false; // will be true if redirected from my profile to create demand else false
    // listOfStoneSendUser = [];

    constructor(
        public router: Router,
        public http: HttpClient,
        public serverVariableService: ServerVariableService,
        public validationService: ValidationService,
        public routerVariableService: RouteVariableService,
        public message: NotificationsService,
        public storageListner: StorageListnerService,
        public langService: LanguageService,
        public encrDecrService: EncrDecrService
    ) {

    }

    getMethodAPI(apiName, callback: (response) => void) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'Application/json');
        apiName = this.URL + this.APIStartWith + apiName;
        return this.http.get(apiName, { headers }).subscribe(
            getResponse => {
                callback(getResponse);
            },
            (err: HttpErrorResponse) => {
                console.log('http get error', err);
                callback(err);
            }
        );
    }
    postMethodAPI(urlServe, params, callback: (response) => void) {
        const httpHeader = new HttpHeaders();
        const url = this.URL + this.APIStartWith + urlServe;
        const options = { headers: httpHeader };
        return this.http.post(url, params, options).subscribe(
            getResponse => {
                callback(getResponse);
            },
            (err: HttpErrorResponse) => {
                console.log('http post error : ', err);
                callback(err);
            }
        );
    }

    putMethodAPI(urlServe, params, id, callback: (response) => void) {
        const httpHeader = new HttpHeaders();
        console.log(this.URL + this.APIStartWith + urlServe);
        console.log(id);
        const url = this.URL + this.APIStartWith + urlServe + '/' + id;
        console.log(url)
        const options = { headers: httpHeader };
        return this.http.put(url, params, options).subscribe(
            putResponse => {
                callback(putResponse);
            },
            (err: HttpErrorResponse) => {
                console.log('http put error res : ', err);
                callback(err);
            }
        );
    }

    deleteMethodAPI(url, id, callback: (response) => void) {
        let httpHeader = new HttpHeaders();
        url = this.URL + this.APIStartWith + url + '/' + id;
        const options = { headers: httpHeader };
        return this.http.delete(url, options).subscribe(
            putResponse => {
                callback(putResponse);
            },
            (err: HttpErrorResponse) => {
                console.log('http delete error res : ', err);
                callback(err);
            }
        );
    }

    // putMethodAPI(isDisplayToast, url, params, id, callback: (response) => void, isLoaderHide?: boolean) {
    //     if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
    //         this.loaderStart++;
    //     }
    //     let httpHeader = new HttpHeaders();
    //     if (!this.isAllowRoutes.includes(url)) {
    //         httpHeader = httpHeader.set('Authorization', this.getAccessToken());
    //     }
    //     url = this.URL + this.APIStartWith + url + '/' + id;
    //     const options = {
    //         headers: httpHeader
    //     };
    //     return this.http.put(url, params, options).subscribe(
    //         getResponse => {
    //             if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
    //                 if (this.loaderStart > 0) {
    //                     this.loaderStart--;
    //                 }
    //             }
    //             if (getResponse) {
    //                 this.serverResponse = Deserialize(getResponse, ResponseWrapperDTO);
    //                 if (getResponse['status'] < 200 || getResponse['status'] >= 300) {
    //                     this.CreateNotification(
    //                         'error',
    //                         'Error!',
    //                         this.serverResponse.message
    //                     );
    //                 } else {
    //                     if (isDisplayToast) {
    //                         this.CreateNotification(
    //                             'success',
    //                             'Success!',
    //                             this.serverResponse.message
    //                         );
    //                     }
    //                 }
    //                 this.emailVerifyMessage = this.serverResponse.message; // set message for mail success.
    //                 callback(this.serverResponse.data);
    //             }
    //         },
    //         (err: HttpErrorResponse) => {

    //             if (this.loaderStart > 0) {
    //                 this.loaderStart--;
    //             }
    //             if (err.status === 0) {
    //                 if (!this.isServerDown) {
    //                     this.CreateNotificationNonClose('error', 'Error', 'Server down.');
    //                     this.isServerDown = true;
    //                     setTimeout(() => {
    //                         this.resetServerDown();
    //                     }, 5000);
    //                     window.location.href = this.serverDownUrl;
    //                 }
    //             } else {
    //                 this.serverResponse = Deserialize(err.error, ResponseWrapperDTO);
    //                 console.log(this.serverResponse);
    //                 if (!this.isNullUndefinedOrBlank(this.serverResponse.message)) {
    //                     this.CreateNotification(
    //                         'error',
    //                         'Error!',
    //                         this.serverResponse.message
    //                     );
    //                 } else {
    //                     this.CreateNotification(
    //                         'error',
    //                         'Error!',
    //                         this.serverResponse.error
    //                     );
    //                 }
    //                 this.emailVerifyMessage = this.serverResponse.message ?
    //                     this.serverResponse.message : this.serverResponse.error; // set message for mail success.
    //                 if (err.status === 401) {
    //                     this.storageListner.clear();
    //                     this.redirectTo(this.routerVariableService.LOGIN_URL);
    //                 }
    //             }
    //             callback(err);
    //         }
    //     );
    // }

    // postMethodAPI(isDisplayToast, urlServe, params, callback: (response) => void) {
    //     let httpHeader = new HttpHeaders();
    //     // if (!this.isAllowRoutes.includes(urlServe)) {
    //     //     httpHeader = httpHeader.set('Authorization', this.getAccessToken());
    //     // }
    //     const url = this.URL + this.APIStartWith + urlServe;
    //     console.log('post url : ', url);
    //     // this.customJsonInclude(params);
    //     const options = { headers: httpHeader };
    //     return this.http.post(url, params, options).subscribe(
    //         getResponse => {
    //             console.log('post method res : ', getResponse);
    //             if (getResponse) {
    //                 this.serverResponse = Deserialize(getResponse, ResponseWrapperDTO);
    //                 if (getResponse['status'] < 200 || getResponse['status'] > 300) {
    //                     this.CreateNotification(
    //                         'error',
    //                         'Error!',
    //                         this.serverResponse.message
    //                     );
    //                 } else {
    //                     if (isDisplayToast) {
    //                         this.CreateNotification(
    //                             'success',
    //                             'Success!',
    //                             this.serverResponse.message
    //                         );
    //                     }
    //                     this.loginSuccessMessage = this.serverResponse.message;
    //                     if (300 <= getResponse['status'] && 400 > getResponse['status']) {
    //                         this.CreateNotification(
    //                             'info',
    //                             'info!',
    //                             this.serverResponse.message
    //                         );
    //                     }
    //                 }
    //                 callback(this.serverResponse.data);
    //             }
    //         },
    //         (err: HttpErrorResponse) => {
    //             console.log('http post error : ');
    //             console.log(err);
    //             this.CreateNotification(
    //                 'error',
    //                 'Error!',
    //                 'Invalid Username and Password'
    //             );
    //         }
    //     );
    // }

    // getMethodAPI(isDisplayToast, apiName, params, callback: (response) => void, isLoaderHide?: boolean) {
    //     if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
    //         this.loaderStart++;
    //     }
    //     let headers = new HttpHeaders();
    //     if (!this.isAllowRoutes.includes(apiName) && !this.isNullUndefinedOrBlank(this.getAccessToken())) {
    //         headers = headers.set('Authorization', this.getAccessToken());
    //         headers.append('Content-Type', 'Application/json');
    //     }
    //     apiName = this.URL + this.APIStartWith + apiName;
    //     let httpParams = new HttpParams();
    //     Object.keys(params).forEach(function (key) {
    //         if (key && params[key] && params.hasOwnProperty(key)) {
    //             // if (key  && params.hasOwnProperty(key)) {
    //             // console.log(key);
    //             // console.log(params[key]);
    //             httpParams = httpParams.append(key, params[key]);
    //         }
    //     });
    //     // console.log(httpParams);

    //     return this.http.get(apiName, { params: httpParams, headers }).subscribe(
    //         getResponse => {
    //             // Read the result field from the JSON response.
    //             if (this.isNullUndefinedOrBlank(isLoaderHide) || !isLoaderHide) {
    //                 if (this.loaderStart > 0) {
    //                     this.loaderStart--;
    //                 }
    //             }
    //             if (getResponse) {
    //                 this.serverResponse = Deserialize(getResponse, ResponseWrapperDTO);
    //                 if (getResponse['status'] < 200 || getResponse['status'] > 300) {
    //                     this.CreateNotification(
    //                         'error',
    //                         'Error!',
    //                         this.serverResponse.message
    //                     );
    //                 } else {
    //                     if (isDisplayToast) {
    //                         this.CreateNotification(
    //                             'success',
    //                             'Success!',
    //                             this.serverResponse.message
    //                         );
    //                     }

    //                 }
    //                 callback(this.serverResponse.data);
    //             }
    //         },
    //         (err: HttpErrorResponse) => {
    //             if (this.loaderStart > 0) {
    //                 this.loaderStart--;
    //             }
    //             if (err.status === 0) {
    //                 if (!this.isServerDown) {
    //                     this.CreateNotificationNonClose('error', 'Error', 'Server down.');
    //                     this.isServerDown = true;
    //                     setTimeout(() => {
    //                         this.resetServerDown();
    //                     }, 5000);
    //                     window.location.href = this.serverDownUrl;
    //                 }
    //             } else {
    //                 // logout when tocken is expired --get
    //                 if (err.status === 401) {
    //                     if (!this.isUnAuthorise) {
    //                         this.storageListner.clear();
    //                         this.redirectTo(this.routerVariableService.LOGIN_URL);
    //                         this.CreateNotification('error', 'Error', 'Sorry, You\'re not authorized to access this resource.');
    //                         this.isUnAuthorise = true;
    //                         return;
    //                     }
    //                 } else {
    //                     this.serverResponse = Deserialize(err.error, ResponseWrapperDTO);
    //                     if (!this.isNullUndefinedOrBlank(this.serverResponse.message)) {
    //                         this.CreateNotification(
    //                             'error',
    //                             'Error!',
    //                             this.serverResponse.message
    //                         );
    //                     } else {
    //                         this.CreateNotification(
    //                             'error',
    //                             'Error!',
    //                             this.serverResponse.error
    //                         );
    //                     }
    //                 }
    //             }
    //         }
    //     );
    // }

    getTextboxValue(getText, event1, eventKeyCode, maximum, decimalPoint) {
        let pattern;
        const name = getText.value;
        if (decimalPoint === 0) {
            pattern = /[0-9]+/;
        } else {
            pattern = /[0-9\.]+/;
        }
        const setLength = maximum;
        let setLen;

        const decimal = decimalPoint + 1;
        const inputChar = String.fromCharCode(eventKeyCode);

        if (eventKeyCode !== 8 && !pattern.test(inputChar)) {
            if (eventKeyCode === 0) {
                return;
            }

            event1.preventDefault();
        }
        if (eventKeyCode === 46) {

            if (name.indexOf('.') === -1) {
                getText.maxLength = name.length + decimal;
            } else {
                getText.maxLength = setLength;
                if (setLength !== name.length) {
                    getText.maxLength = name.length;
                }
            }
        } else {
            if (name.indexOf('.') === -1) {
                getText.maxLength = setLength;
            } else {
                getText.maxLength = setLength;
                const lengthOfFristIndex = name.split('.')[0].length;
                const lengthOfLatsIndex = name.split('.')[1].length;
                getText.maxLength = lengthOfFristIndex + decimal;
                if (getText.selectionStart || getText.selectionStart === '0') {
                    this.Pos = getText.selectionStart;
                    if (this.Pos <= lengthOfFristIndex && lengthOfFristIndex <= setLength) {
                        if (lengthOfFristIndex === setLength) {
                            setLen = lengthOfFristIndex + lengthOfLatsIndex + 1;
                            getText.maxLength = setLen;
                        } else {
                            setLen = name.length - 1 + (setLength - lengthOfFristIndex) + (decimal - lengthOfLatsIndex);
                            getText.maxLength = setLen;
                        }
                    }
                }
            }
        }
    }

    checkgetText(textValue, maxLength, decimalPoint) {
        const getText = textValue.value;
        const dd1 = getText && getText.indexOf('.') === 0 ? (textValue.value = 0) : '';
        const dd2 = getText && getText.indexOf('-') !== -1 ? (maxLength = maxLength + 1) : '';
        const dd3 = getText && getText.indexOf('.') !== -1 && getText.split('.')[1].length > decimalPoint ?
            (textValue.value = getText.slice(0, getText.indexOf('.') + 1 + decimalPoint)) : '';
        const dd4 = getText && getText.indexOf('.') === -1 && getText.length > maxLength ?
            (textValue.value = getText.slice(0, maxLength)) : '';
        if (getText && getText.split('.')[0].length === 0 && getText.split('.')[1].length !== 0) {
            textValue.value = 0 + getText;
        }
    }
    /** end used for number Check only numbers allowed in textbox */

    /**
     * This Method Is Use From Remove Empty Element From Array
     * @param test_array  your selected array pass as args.
     */
    removeEmptyElementsFromArray(test_array) {
        let index = -1;
        const arr_length = test_array ? test_array.length : 0;
        let resIndex = -1;
        const result = [];

        while (++index < arr_length) {
            const id = test_array[index];
            if (id) {
                result[++resIndex] = id;
            }
        }
        return result;
    }

    resetServerDown() {
        this.isServerDown = false;
    }

    /* If search text is valid then call api. */
    isCallSearchAPI(value) {
        if (value.length === 0 && value.trim().length === 0) {
            return true;
        }
        if (value.trim().length) {
            return true;
        } else {
            return false;
        }
    }
    /* end */

    preventSpace(event) {
        event.target.value = event.target.value.replace(/^\s+/g, '');
    }

    /* Image Preview*/
    readUrl(event, callback: (response) => void) {
        if (event.target.files && event.target.files[0]) {
            let reader: any;
            reader = new FileReader();
            reader.onload = e => {
                this.imagePreview = e.target.result;
                return callback(this.imagePreview);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    /* End Image Preview*/

    // used to convert array '[]' to String '' ''
    ConvertModelIdToString(arrayOfKeys, array) {
        const newArray = array;
        const newarrayOfKeys = arrayOfKeys;
        for (const keyName in newArray) {
            if (arrayOfKeys.length > 0) {
                if (newarrayOfKeys.includes(keyName)) {
                    if (
                        typeof newArray[keyName] === 'object' &&
                        this.isEmptyObject(newArray[keyName])
                    ) {
                        newArray[keyName] = undefined;
                    }
                    if (!this.isNullUndefinedOrBlank(newArray[keyName])) {
                        newArray[keyName] = newArray[keyName].toString();
                    }
                    delete arrayOfKeys[newArray[keyName]];
                }
                if (arrayOfKeys.length > 0 && typeof newArray[keyName] === 'object') {
                    this.ConvertModelIdToString(arrayOfKeys, newArray[keyName]);
                }
            }
        }
        return newArray;
    }

    /**
     * This Method Is Use For Remove Blank And Null Key From Object.
     */
    customJsonInclude(obj) {
        const newObj: Object = new Object(obj);
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                if (obj[key] && obj[key].length > 0) {
                    obj[key] = this.removeEmptyElementsFromArray(obj[key]);
                }
                if (this.isEmptyObject(obj[key])) {
                    delete obj[key];
                } else {
                    this.customJsonInclude(obj[key]);
                }
            } else {
                if (obj[key] === undefined || obj[key] === null) {
                    delete obj[key];
                }
            }
        }
    }

    /*
    *
    * Used to check if object ios empaty or not..!
    * @param obj = 'indecated object which you want to check'
    * return true if empty..!
    */
    isEmptyObject(obj) {
        return obj && Object.keys(obj).length === 0;
    }

    // used for redirect using route of component
    redirectTo(route) {
        this.router.navigate([route]);
    }

    // checks whether object null or undefined or blank and returns true or false
    isNullUndefinedOrBlank(obj) {
        if (obj == null || obj === undefined || (obj === '' && obj !== 0)) {
            return true;
        }
        return false;
    }

    // to hide modal from ts using modelId
    hideModal(modelId: string) {
        $('' + '#' + modelId + '').modal('hide');
    }

    // usde to open model from tf usinf model id
    openModal(modelId: string) {
        $('' + '#' + modelId + '').modal({ backdrop: 'static', keyboard: false }); // model will close only on button click
        // $('' + '#' + modelId + '').modal('show');
    }

    /**
     * @author : Dhrumin
     * @param fileUrl : JSON file URL
     * @ function getJsonData : returns the data of JSON file
     */
    getJsonData(fileUrl: string) {
        return this.http.get(fileUrl);
    }

    /**
     * @author : savan
     * @param type : Notification type [Success , Error, Warning]
     * @param message : to set msg in Notification
     * @param content : to set Message details in Notification
     * @version : angular2-notifications => 1.0.4
     */
    CreateNotification(type, message, content) {
        // const timeOut = 5000;
        let timeOut = 0;
        if (type === 'success') {
            timeOut = 5000;
        }
        this.message.create(message, content, type, {
            timeOut: timeOut,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 1000
        });
    }
    CreateNotificationNonClose(type, message, content) {
        const timeOut = 5000;
    }
    // used to reset all notifications
    resetAllNotification() {
        // this.message.remove();
    }

    // to get Token from local storage
    getAccessToken() {
        const userDetail = localStorage.getItem(this.serverVariableService.LOCAL_STORAGE_FOR_USER_DETAIL);
        if (!this.isNullUndefinedOrBlank(userDetail)) {
            const user = JSON.parse(userDetail);
            return user.token;
        } else {
            return null;
        }
    }

    // to get Token from local storage
    getUserDetails() {
        const userDetail = localStorage.getItem(this.serverVariableService.LOCAL_STORAGE_FOR_USER_DETAIL);
        if (!this.isNullUndefinedOrBlank(userDetail)) {
            const user = JSON.parse(userDetail);
            return user;
        } else {
            return null;
        }
    }

    /**
    * This method is used to check all checkbox of list if isCheckAll is true, otherwise it uncheck all checkboxes of list.
    * @param isCheckAll : indicates true or false.
    * @param detailsArray : indicates list that contains checkboxes.
    */
    checkAll(isCheckAll, detailsArray, isHold?) {
        if (isHold) {
            detailsArray.forEach(ele => {
                if (ele.pktMaster.isHold === false || !ele.pktMaster.isHold) {
                    ele.selected = isCheckAll;
                }
            });
        } else {
            detailsArray.forEach(ele => {
                ele.selected = isCheckAll;
            });
        }
        return isCheckAll;
    }
    /***
     * This method is used to make isCheckAll true if all checkboxes of list is checked, otherwise it makes isCheckAll to false;
     * @param isSingleChecked : indicates true if user check checkbox of list otherwise indicates false.
     * @param isCheckAll : indicates true of checkbox for all is checked otherwise indicates false.
     * @param detailsArray : indicates list that contains checkboxes.
     */
    singleCheck(isSingleChecked, isCheckAll, detailsArray) {
        if (!isSingleChecked) {
            isCheckAll = false;
            return isCheckAll;
        }
        for (const i in detailsArray) {
            if (!detailsArray[i].selected) {
                isCheckAll = false;
                return isCheckAll;
            }
        }
        isCheckAll = true;
        return isCheckAll;
    }

    /**
     * @author shamaji chavada
     * @param text to translate
     * @ function transME() Translate the word/text using language translation.
     */
    // transME(text) {
    //     return this.langService.instant(text);
    // }

    /**
     * @author bhumi
     * @param string accept link for download
     */
    downloadUtility(links) {
        const dlLink = document.createElement('a');
        dlLink.setAttribute('crossOrigin', 'anonymous');
        dlLink.setAttribute('data-downloadurl', links);
        dlLink.href = links;
        dlLink.download = 'downloadfile.png';
        dlLink.dataset.downloadurl = [dlLink.download, links.href].join(':');
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);

    }

    /**
     * @author savan
     * @param enddate get time difference from given end date in stone hold
     * @ function getTimeDiff(enddate) get time diference between current date and end-date
     */
    getTimeDiff(enddate) {
        let diff = '';
        const date_future: any = new Date(enddate);
        const date_now: any = new Date();
        // set
        let seconds = Math.floor((date_future - (date_now)) / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        // conculation
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        if (hours < 10) { diff += '0' + hours; } else { diff += hours; }
        if (minutes < 10) { diff += ':0' + minutes; } else { diff += ':' + minutes; }
        if (seconds < 10) { diff += ':0' + seconds; } else { diff += ':' + seconds; }
        // diff = hours + ' : ' + minutes + ' : ' + seconds;
        return diff;
    }

    // to convert date formate compare two dates
    convertDateFormat(dateObj) {
        const date = new Date();
        if (isDate(dateObj)) {
            dateObj.setHours(date.getHours());
            dateObj.setMinutes(date.getMinutes());
            dateObj.setSeconds(date.getSeconds());
            return dateObj;
        }
    }

    // to convert date formate compare two dates
    dateYYYYMMDD(dateObj) {
        const date = new Date(dateObj);
        var dd: any = date.getDate();
        var mm: any = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) { dd = '0' + dd; }
        if (mm < 10) { mm = '0' + mm; }
        var dateStr = yyyy + '-' + mm + '-' + dd;
        return dateStr;
    }

    // .......... Start Pagination Related Methods ...............
    public getPreviousData(pagination: PaginationRequest) {
        pagination.pageNumber = (+pagination.pageNumber - 1).toString();
    }
    public getNextData(pagination: PaginationRequest) {
        pagination.pageNumber = (+pagination.pageNumber + 1).toString();
    }

    public changeNoOfRecord(pagination: PaginationRequest) {
        pagination.pageNumber = String(1); // String(0);
    }

    public setSortByKeyAndOrder(pagination: PaginationRequest, key: string) {
        let className = '';
        if (pagination.sortColumn && pagination.sortColumn === key) {
            if (pagination.sortOrder === 'a') {
                pagination.sortOrder = 'd';
                className = 'shorting ti-arrow-up';
            } else {
                pagination.sortOrder = 'a';
                className = 'shorting ti-arrow-down';
            }
        } else {
            pagination.sortColumn = key;
            pagination.sortOrder = 'a';
            className = 'shorting ti-arrow-down';
        }
        pagination.classForUpDown = className;
    }

    setPaginationSetting(pagination: PaginationResponse) {
        if (pagination) {
            pagination.startPos = +pagination.pageable['offset'] + 1;
            pagination.endPos = +pagination.pageable['offset'] + +pagination.size;
            if (pagination.totalPages) {
                for (let i = 0; i < pagination.totalPages; i++) {
                    pagination.pageArray.push({
                        id: i.toString(),
                        name: 'Page ' + (i + 1)
                    });
                }
            }
        }
        return pagination;
    }

    setPaginationOnDeleteAndUpdateRecords(
        last: boolean,
        numberOfElements: number,
        paginationRequest: PaginationRequest
    ) {
        if (last && numberOfElements === 1 && paginationRequest.pageNumber !== '0') {
            paginationRequest.pageNumber = (+paginationRequest.pageNumber - 1).toString();
        }
        return paginationRequest;
    }
    // when multiple delete records for pagination.
    setPaginationOnMultipleDelete(listOfIds: Array<string>, paginationRequest: PaginationRequest, totalElements: number) {
        const pageNumber = +paginationRequest.pageNumber + 1;
        const leftRecord = +totalElements - (+listOfIds.length);
        let leftPage = Math.ceil(+leftRecord / +paginationRequest.noOfRecords);
        if (+pageNumber > +leftPage) {
            leftPage = (+leftPage - 1);
            if (+leftPage <= 0) { leftPage = 1; }
            paginationRequest.pageNumber = leftPage.toString();
        }
        return paginationRequest;
    }
    // .......... End Pagination Related Methods ...............
}
