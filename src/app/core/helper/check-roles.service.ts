import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckRolesService {

  constructor() { }

  private sub = new BehaviorSubject(false);

  setcheckToken() {
    if (localStorage.getItem('token')) {

      let payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1].toString()))

      let roles = payLoad.role;

      if (Array.isArray(roles)) {
        let isadmin = !!roles.find(a => a == 'admin');
        this.sub.next(isadmin)
      }
      else {
        let isAdmin = roles == 'admin';
        this.sub.next(isAdmin);

      }

    }
    else {
      this.sub.next(false);

    }
  }

  getCheckToken() {
    return this.sub;
  }

}
