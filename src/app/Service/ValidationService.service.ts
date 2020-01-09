import { Injectable } from '@angular/core';
import { isDate } from 'util';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() { }


    /* Variables for set Max Length  */

    USERNAME = 30;
    USERNAMEOREMAIL = 50;
    NAMEFORREGISTRATION = 30;
    PASSWORD = 32;
    EMAILID = 50;
    PREFIX = 5;
    ALLNAME = 32;
    STATE = 50;
    CITY = 50;
    ZIP = 12;
    COMPANYNAME = 50;
    ADRESS = 300;
    PHONENUMBER = 20;
    MOBILENO = 20;
    ISD = 10;
    STD = 12;
    SEARCHTEXT = 30;
    SEARCHNAME = 30;
    SUFFIX = 15;
    NOOFUSER = 4;

    // Variables for set Max Length All Masters  Start
    COMMONLENGTHFORALLMASTERNAMEINPUTFIELDS = 30;
    COMMONLENGTHFORFIFTY = 30;
    FLOURSCENCENAME = 15;
    BROWNSHADENAME = 15;
    BROWNSHADESHORTNAME = 3;
    MILKNAME = 15;
    COUNTRYSHORTNAME = 15;
    MILKSHORTNAME = 15;
    SHORTNAMEFORFLUORSCENCE = 3;
    CUTPOLISHSYMMETRYNAME = 2;
    COLORMASTERNAME = 3;
    LABNAME = 3;
    SHAPENAMELEN = 30;
    SHAPECODELEN = 5;
    MAXLENFORSEARCSTONE = 1000;
    BUSINESS_TYPE = 100;

    // Variables for set Max Length All Masters  End


    /* End Variables for set Max Length  */


    /* End Variables for set Max Length  */
    AMOUNTPOINTLEFT = 2;
    AMOUNTPOINTRIGHT = 2;
    AMOUNTPOINTLEFTFORCARAT = 2;
    AMOUNTPOINTRIGHTCARAT = 2;
    AMOUNTPOINTLEFTFORSEARCHSCREEN = 3;
    AMOUNTPOINTRIGHTFORSEARCHSCREEN = 2;
    SETAMOUNTRIGHTZERO = 0;
    SETAMOUNLEFTFIVE = 5;
    SETAMOUNLEFTSIX = 6;
    AMOUNTPOINTLEFTFORTOTALPRICE = 8;
    AMOUNTPOINTRIGHTFORTOTALPRICE = 2;

    // maximum length for app version
    APP_VERSION_MAXLEN = 12;
    APP_VERSION_PATTERN = /^[0-9.]+$/;
    /* pattern use for validation */
    DEMANDNAME = 30;
    OTP = 6;

    /* Start - pattern use for validation */

    NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
    STATE_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
    CITY_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
    LANGUAGE_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
    ONLY_NUMBERS = '^[0-9]*$';
    ONLY_NUMBERS_PAT = /^[0-9]*$/;
    DATE = /^\d+\/\d+\/\d+$/;
    // ONLY_NUMBERS_AND_DOT = /^[0-9.]{1,15}$/;
    PATTERN_FOR_HOLIDAY_NAME = /^([a-zA-Z][a-zA-Z\s]*)$/;
    PATTERN_FOR_USER_ROLE_NAME = /^([a-zA-Z][a-zA-Z[\_\]\s]*)$/;
    ONLY_NUMBERS_AND_DOT = /^[0-9]+(?:\.[0-9]+)?$/;
    ONLY_NUMBERS_AND_DOT_MINUS = /^-?[0-9]\d*(\.\d+)?$/;
    PATTERN_FOR_ACCOUNT_NO = /^\d{6,18}$/;
    PATTERN_FOR_NAME_WITH_DOT = /^[A-Za-z]+(?:\.[A-Za-z]+)*?$/;
    PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DASH_DIGIT = '^[a-zA-Z0-9- ]*$';
    PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DASH_DIGIT1 = '^[a-zA-Z0-9, ]*$';
    ONLY_SPACE_AND_SPACIAL_CHARACTER_NOT_ALLOW = /^(?=.*[A-Za-z\d])[A-Za-z\d\-_$@$!%*#?& ]{1,}$/;
    LAB_MASTER_NAME = /.*\S.*/;
    ONLY_SPACE_NOT_ALLOW = /.*\S.*/;
    PATTERN_FOR_ALPHANUMERIC_DIGIT_SPECIAL_ESCAPE_CHARS = /.*\S.*/;
    PATTERN_FOR_ALPHANUMERIC_DIGIT_SPECIAL_ESCAPE_CHARS1 = /^[A-Za-z0-9\[\]()*\-+/% ]*$/;
    PATTERN_FOR_ALPHABETS_DIGIT_SPECIAL_ESCAPE_CHARS = /^[A-Za-z]+([\s-][A-Za-z]+)*$/;
    PATTERN_FOR_ONLY_ALPHABATES = '^[a-zA-Z]*$';
    PATTERN_FOR_ALPHABATES_AND_SPACE_AND_DIGIT = '^[a-zA-Z0-9 ]*$';
    PATTERN_FOR_ALPHABATES_AND_DIGIT = '^[a-zA-Z0-9]*$';
    PATTERN_FOR_ALPHABATES_AND_SPACE = '^([a-zA-Z][a-zA-Z ]*)$';
    PATTERN_FOR_ALPHABATES_NUMBER_AND_SPACE = '^([a-zA-Z0-9][a-zA-Z0-9 ]*)';
    // PATTERN_FOR_EMAIL = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    PATTERN_FOR_EMAIL = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
    PATTERN_FOR_EMAIL_OR_PHONE_NO = '^(?:([a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3})|([0-9]{10,13}))$';
    PATTERN_FOR_EMAIL_OR_USERNAME = /^(?:((([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))|([a-zA-Z0-9]*))$/;
    // PATTERN_FOR_PHONE_NO = '^[0-9]{10,13}$';
    // PATTERN_FOR_PHONE_NO = '^[0-9]{1,20}$';
    PATTERN_FOR_PHONE_NO = '[+]?[0-9]{1,20}$';
    PATTERN_FOR_NUMBER = '^[0-9]*$';
    PATTERN_FOR_PINCODE = '^[0-9]{6}$';
    PATTERN_FOR_ISD_CODE = '^[0-9]{1,3}$';
    PATTERN_FOR_STD_CODE = '^[0-9]{4,3}$';
    PATTERN_FOR_LANDLINE_NO = '^[0-9]{11}$';
    PATTERN_FOR_ADHARCARD_NO = '^[0-9]{12}$';
    PATTERN_FOR_PANCARD_NO = '^[A-Z]{5}[0-9]{4}[A-Z]{1}$';
    PATTERN_FOR_PASSWORD = '^(?=.*?[a-zA-z])(?=.*?[0-9]).{6,32}$';
    // PATTERN_FOR_PASSWORD = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,32}$';
    PATTERN_FOR_GST_NO = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}/;
    PATTERN_FOR_IFSC_CODE = /^[A-Za-z]{4}[0][A-Za-z0-9]{6}$/;
    PATTERN_FOR_DATE_INPUT =
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;


    PETTERN_FOR_PERCENTAGE = /\b(0*(?:[1-9][0-9]?|100))\b/;
    PETTERN_FOR_SALARY_STRUCT_COMPONENT = /^([a-zA-Z][a-zA-Z[\&\]\s]*)$/;
    // static PATTERN_FOR_PERCENTAGE1 = /\b(0*(?:[1-9][0-9]?|100))\b/;

    /* End - pattern use for validation */

    maxImageSize = 512000; // (1024 * 25); // 500 KB allowed image size
    // maxImageSize = 1024 * (1024 * 25); // 25 MB allowed image size
    sizeImgError = 'Please select lessthan 500 kb size image.';

    /* LOGIN Validation Msg START */
    EMAIL_REQ = 'Email Id  is required.';
    EMAIL = 'Please enter valid Email Id.';
    USERNAME_OR_EMAIL_REQ = 'Username or E-mail is required.';
    USERNAME_OR_EMAIL = 'Please enter valid Username or E-mail.';
    INVALID_LOGIN_PASSWORD = 'Please enter valid password.';
    INVALID_LOGIN_PASSWORD_REQ = 'Password is required.';
    INVALID_LOGIN_PASSWORD_REG = 'Please enter valid password. must contain(number,special character, capital letter).';
    INVALID_FORGET_PASSWORD_LINK = 'Reset password invalid link.';
    /* LOGIN Validation Msg END */

    // Common Validation Msg For All Components - Start //
    VALIDATION_MESSAGE_BEFORE_DELETE = 'Do you really want to delete these record?';
    MESSAGE_FOR_NO_RECORDS_FOUND = 'There is no records found.';
    // Common Validation Msg For All Components - End //

    // Make Offer Discount error message
    REQUIRED_DISCOUNT = 'Please Enter Valid Discount';
    REQUIRED_OFFER_DISCOUNT = 'Discount is required.';


    // Required Validation Msg For All Components - Start //

    /* Required Validation Msg for Registration START */
    REQUIRED_FIRST_NAME = 'First Name is required.';
    REQUIRED_LAST_NAME = 'Last Name is required.';
    REQUIRED_EMAIL = 'E-mail address is required.';
    REQUIRED_PASSWORD = 'Password is required.';
    REQUIRED_CONFRIM_PASSWORD = 'Confirm Password is required.';
    REQUIRED_MOBILE_NO = 'Mobile Number is required.';
    REQUIRED_PHONE_NO = 'Phone Number is required.';
    REQUIRED_USER_NAME = 'User Name is required.';
    REQUIRED_COMPANY_NAME = 'Company Name is required.';
    REQUIRED_COMPANY_ADDRESS = 'Company Address is required.';
    REQUIRED_ZIPCODE = 'Zip/Postal Code is required.';
    REQUIRED_COUNTRY = 'Country is required.';
    REQUIRED_STATE = 'State is required.';
    REQUIRED_CITY = 'City is required.';
    PASSWORD_AND_CONFIRM_PASSWORD_NOT_EQUAL = 'Password and Confirm Password not equal.';
    REQUIRED_PREFIX = 'Prefix is required.';
    REQUIRED_BUSINESS_TYPE = 'Business Type is required.';
    /* Required Validation Msg for  Registration END */

    REQUIRED_SEARCHNAME = 'SearchName is required.';
    // Required Validation Msg For All Components - End //



    // Invalid Validation Msg For All Components - Start //

    /* Invalid Validation Msg for  Registration START */


    VALID_BIRTH_DATE = true;
    VALID_JOINING_DATE = true;
    VALID_START_DATE = true;
    VALID_END_DATE = true;
    VALID_TERMINATION_DATE = true;

    minHolidayDate = new Date(2000, 0, 0);
    minBirthDate = new Date(1900, 0, 0);
    maxBirthDate = new Date();
    minJoiningDate = new Date(2005, 0, 0);
    maxJoiningDate = new Date(2025, 0, 0);
    maxTerminationDate = new Date(2025, 0, 0);

    /* is Date valid check */

    isStartDateValid(userDate, event?: any) {
        if (event && event.value === 'day-month-year') {
            this.VALID_START_DATE = true;
            return;
        }
        if (isDate(userDate)) {
            this.VALID_START_DATE = this.checkMinBirthDate(userDate, this.minJoiningDate, this.maxJoiningDate);
        } else {
            if (event) {
                const newDate = new Date(event.value);
                if (isDate(newDate)) {
                    this.VALID_START_DATE = this.checkMinBirthDate(userDate, this.minJoiningDate, this.maxJoiningDate);
                }
            }
        }
    }

    isEndDateValid(userDate, event?: any) {
        if (event && event.value === 'day-month-year') {
            this.VALID_END_DATE = true;
            return;
        }
        if (isDate(userDate)) {
            this.VALID_END_DATE = this.checkMinBirthDate(userDate, this.minJoiningDate, this.maxJoiningDate);
        } else {
            if (event) {
                const newDate = new Date(event.value);
                if (isDate(newDate)) {
                    this.VALID_END_DATE = this.checkMinBirthDate(userDate, this.minJoiningDate, this.maxJoiningDate);
                }
            }
        }
    }

    checkMinBirthDate(date, minDate, maxDate) {
        if (isDate(date)) {
            if (date > minDate && date < maxDate) {
                return true;
            } else {
                return false;
            }
        }
    }

    /* End date validation */

}
