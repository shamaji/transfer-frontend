import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/Service/UtilService.service';
import { LoginRequest } from 'src/app/Modal/Response/LoginRequest';
import { ServerVariableService } from 'src/app/Service/serverVariable.service';
import { Deserialize } from 'cerialize';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user: any = {};
  message = '';
  constructor(public utils: UtilsService, public serverVar: ServerVariableService, public router: Router) { }

  ngOnInit() { }

  // login() {
  //   if (this.user.username && this.user.password) {
  //     this.utils.postMethodAPI(this.serverVar.LOGIN, this.user, (response) => {
  //       if (!this.utils.isNullUndefinedOrBlank(response)) {
  //         if (!this.utils.isNullUndefinedOrBlank(response.status) && response.status === 200) {
  //           if (!this.utils.isNullUndefinedOrBlank(response.data)) {
  //             this.utils.CreateNotification('success', 'Success!', response.message);
  //             localStorage.setItem(this.serverVar.LOCAL_STORAGE_FOR_USER_DETAIL, JSON.stringify(response.data));
  //             this.router.navigate(['/home']);
  //           } else {
  //             this.utils.CreateNotification('error', 'Error!', 'User Record not  found');
  //           }
  //         } else {
  //           this.utils.CreateNotification('error', 'Error!', 'please enter valid username and password');
  //         }
  //       }
  //     });
  //   } else {
  //     this.utils.CreateNotification('error', 'Error!', 'please enter username and password');
  //   }
  // }
  login() {
    this.message = '';
    if (this.user.username && this.user.password) {
      this.user.userName = this.user.username;
      this.utils.CreateNotification('success', 'Success!', 'Login Successfully.');
      localStorage.setItem(this.serverVar.LOCAL_STORAGE_FOR_USER_DETAIL, JSON.stringify(this.user));
      this.router.navigate(['/home']);
    } else {
      this.message = 'Plaese enter details';
    }
  }

}
