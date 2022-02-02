import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { IuserLogin } from 'src/app/shared/interfaces/iuser-login';
import { IuserRegister } from 'src/app/shared/interfaces/iuser-register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  private url = 'http://localhost:25942/api/account';

  userLogin(user: IuserLogin) {
    return this.http.post(`${this.url}/login`, user).pipe(

      tap({
        next: (success: any) => {
          localStorage.setItem('token', success.token);
          this.router.navigate(['/home']);


        },
        error: error => { }
      })
    );
  }

  userRegister(user: IuserRegister) {
    return this.http.post(`${this.url}/register`, user)
  }

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);

  }

  roleMatch(routedRoles: string[]) {

    let payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1].toString()));
    let roles = payLoad.role;

    let isMatch = false;
    if (Array.isArray(roles)) {
      for (const role of roles) {
        if (routedRoles.find(a => a == role)) { return true; }
      }
      return isMatch;
    }
    else {

      if (routedRoles.find(a => a == roles)) {
        return true;
      }
      return isMatch;

    }

  }




}
