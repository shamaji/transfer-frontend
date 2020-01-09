import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteVariableService {

  constructor() { }


  public static FORGOT_PASSWORD = '/forgot-password';
  public LOGIN_URL = '/login'; // /home/work_area/landing

}
