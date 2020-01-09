import { Injectable, Inject } from '@angular/core';
//import { TRANSLATIONS } from '../lang_translate/translate.pipe';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // private _currentLang: string = 'en';
  currentLang = 'en';
  objOfLang = {currentLang: 'en' };

  // List Of Supported Language Array
  supportedLangs: any[] = [
    // { display: 'हिंदी', value: 'hn' },
    { display: 'English', value: 'en', flagImageName: 'assets/images/en.png' },
    { display: '华语', value: 'cn', flagImageName: 'assets/images/c_flag.jpg' }
  ];

  // Will Return You Current Set Language.
  public get currentLangage() {
    return this.currentLang;
  }

  // inject our translations
  constructor(
    //@Inject(TRANSLATIONS) public _translations: any
    ) { }

  // Will Use The Provided Language In function and set to it.
  // set current language
  public use(lang: string): void {
    this.currentLang = lang;
  }

  public translate(key: string): string {
    // private perform translation
    const translation = key;

    if (false
     // this._translations[this.currentLang] &&
     // this._translations[this.currentLang][key]
    ) {
      return null;
      //this._translations[this.currentLang][key];
    }

    return translation;
  }

  // call translation  will do translation
  public instant(key: string) {
    return this.translate(key);
  }
  // get current selected langue
  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this.currentLang;
  }
  // set Lan
  selectLang(lang: string) {
    // set current lang;
    this.use(lang);
  }
}
