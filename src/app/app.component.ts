import { Component } from '@angular/core';
import { UtilsService } from './Service/UtilService.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  options = { position: ['top', 'center'] };
  constructor(public utilsService: UtilsService, public router: Router, private route: ActivatedRoute) {
    router.events.forEach(val => {
      if (val instanceof NavigationStart) {
        console.log(' Current Url : ' + val.url);
        if (this.utilsService.getUserDetails() == null) {
          if (val.url !== '/' && val.url !== '/sign-up' && val.url !== '/sign-up/sign-in') {
            console.log('go to login');
            this.utilsService.redirectTo('/sign-up/sign-in');
          } else { console.log('already on login page'); }
        } else {
          console.log('iddddddd')
        }
      }
    });

  }
}
