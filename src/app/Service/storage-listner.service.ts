import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs';
import { Serialize } from 'cerialize';
import { EncrDecrService } from './Encr-Decr.service';
import { LoginResponse } from '../Modal/Response/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class StorageListnerService implements OnDestroy {
  private onSubject = new Subject<{ key: string, value: any }>();
 // public changes = this.onSubject.asObservable().share();
  key = 'userDetails';
  keyTP = 'userDetails';
  oldUserMigrationKey = 'migration';
  storForStoneIds = 'setStoneIds';

  constructor(public router: Router, public encrDecrService: EncrDecrService) {
    this.start();
  }
  ngOnDestroy() {
    this.stop();
  }

  public storeForThirdParty(key: string, data: any): void {
    data.isThirdParty = true;
    const encrypted = this.encrDecrService.encryptDataUsingAES(this.encrDecrService.key2, JSON.stringify(Serialize(data, LoginResponse)));
    localStorage.setItem(key, encrypted);
    this.router.navigate(['/home/work_area/third-party-api']);
    this.onSubject.next({ key: key, value: data });
  }

  public store(key: string, data: LoginResponse): void {
    const encrypted = this.encrDecrService.encryptDataUsingAES(this.encrDecrService.key2, JSON.stringify(Serialize(data, LoginResponse)));
    localStorage.setItem(key, encrypted);
    // this.router.navigate(['/home/work_area/user/dashboard']);
    this.onSubject.next({ key: key, value: data });
  }


  public clear() {
    const key = 'userDetails';
    localStorage.removeItem('userDetails');
    localStorage.removeItem('isFirstTime');
    this.router.navigate(['/login']);
    // this.router.navigate(['/home/work_area/landing']);
    // this.router.navigate([RouteVariableService.LOGIN_URL]);
    this.onSubject.next({ key: key, value: null });
  }
  public clearTh() {
    const key = 'userDetails';
    localStorage.removeItem('userDetails');
    this.router.navigate(['/home/work_area/api-login']);
    this.onSubject.next({ key: key, value: null });
  }

  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {

    if (event.storageArea === localStorage) {

      let v: any;
      try {
        v = JSON.parse(event.newValue);
      } catch (e) {
        v = event.newValue;
      }
      if (event.key === this.key) {
        if (!v) {
          this.router.navigate(['/login']);
          // this.router.navigate(['/home/work_area/landing']);
        } else {
          this.router.navigate(['/home/work_area/user/dashboard']);
        }
      }
      this.onSubject.next({ key: event.key, value: v });
    }

  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }

  /**
   * @author : savan
   * @param  : will accept username and password.
   * @ function setRemember : setRemeber function will accept parameter username and password and will store in localstorage
  */
  setRemember(user, password) {
    localStorage.setItem('rememberMe', 'rememberMe');
    localStorage.setItem('user', user);
    localStorage.setItem('pass', password);
  }

  /**
   * @author : savan
   * @ function unSetRemember : unSetRemember function will Remove Localstorage value from username,password,remeberME
   */
  unSetRemember() {
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('user');
    localStorage.removeItem('pass');
  }

  /**
   * @author : savan
   * @ function setUserMigration : function will set Localstorage value for old migaration user record.( for userid)
   */
  setUserMigration(migration) {
    localStorage.setItem(this.oldUserMigrationKey, JSON.stringify(migration));
  }
  /**
   * @author : savan
   * @ function unSetUserMigration : function will Remove Localstorage value for old migaration user record.( for userid)
   */
  removeSetUserMigration() {
    localStorage.removeItem(this.oldUserMigrationKey);
  }
  // will return localstorage value
  getUserMigration() {
    return localStorage.getItem(this.oldUserMigrationKey);
  }
}
