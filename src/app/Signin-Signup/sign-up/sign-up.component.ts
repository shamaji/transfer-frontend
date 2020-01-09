import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/Service/UtilService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: any = {};
  message = '';
  constructor(public utils: UtilsService, public router: Router) { }

  ngOnInit() {
  }

  reg() {
    this.message = '';
    if (this.user.name && this.user.email && this.user.password) {
      if (this.user.cpassword == this.user.password) {
      this.utils.usersList.push(this.user);
      this.user = {};
      this.router.navigate(['/sign-up/sign-in']);
      } else {
        this.message = 'password and confirm password not same';  
      }
    } else {
      this.message = 'Plaese fill all details';
    }
  }

}
