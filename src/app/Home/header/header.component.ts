import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/Service/UtilService.service';
import { Router } from '@angular/router';
import { ServerVariableService } from 'src/app/Service/serverVariable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = '';
  constructor(public utils: UtilsService, public router: Router, public serverVar: ServerVariableService) { }

  ngOnInit() {
    const user: any = this.utils.getUserDetails();
    if (!this.utils.isNullUndefinedOrBlank(user)) {
      this.username = user.userName;
    }
  }

  logout() {
    localStorage.removeItem(this.serverVar.LOCAL_STORAGE_FOR_USER_DETAIL);
    this.router.navigate(['/sign-up/sign-in']);
  }

}
