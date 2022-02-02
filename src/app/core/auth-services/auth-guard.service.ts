import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userSer: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (localStorage.getItem('token')) {
      if (route.data['routedRoles'] && route.data['routedRoles'] != null) {
        let can = this.userSer.roleMatch(route.data['routedRoles']);
        if (can) {
          return true;
        }
        else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }

      return true;


    }


    //
    else {
      this.router.navigate(['/user/login'], { queryParams: { 'returnUrl': state.url } });
      return false;

    }
  }
}
