import { Injectable } from '@angular/core';
// const CryptoJS = require('crypto-js'); // npm i @types/node
import { CryptoJS } from 'crypto-js';
@Injectable({
    providedIn: 'root'
})

export class EncrDecrService {
    // key = 'mvLBiZ';
    key = 'mvLBiZsiTbGwrf@!';
    key2 = 'tCLiG52kwrf@ybl!';
    constructor() { }

    // The set method is use for encrypt the value.
    encryptDataUsingAES(keys, value) {
        // console.log(keys);
        // console.log(value);
        const key = CryptoJS.enc.Utf8.parse(keys);
        const iv = CryptoJS.enc.Utf8.parse(keys);
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted.toString();
    }

    // The get method is use for decrypt the value.
    decryptDataUsingAES(keys, value) {
        try {
            const key = CryptoJS.enc.Utf8.parse(keys);
            const iv = CryptoJS.enc.Utf8.parse(keys);
            const decrypted = CryptoJS.AES.decrypt(value, key, {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            // console.log(error);
            localStorage.removeItem('userDetails');
            return null;
        }
    }

    // checks whether object null or undefined or blank and returns true or false
    isNullUndefinedOrBlank(obj) {
        if (obj == null || obj === undefined || (obj === '' && obj !== 0)) {
            return true;
        }
        return false;
    }
}
