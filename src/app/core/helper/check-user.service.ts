import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {

  constructor() { }


  userData = new BehaviorSubject(null);

  setToken() {
    if (localStorage.getItem('token')) {

      let payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1].toString()))

      let userId = payLoad.UserID;
      this.userData.next(userId);

    }
    else {
      this.userData.next(null);
    }
  }

  getToken() {
    return this.userData;
  }


}
