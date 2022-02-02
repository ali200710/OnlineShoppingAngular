import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (localStorage.getItem('token') != null) {
      let updateReq = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token')?.toString())
      });

      return next.handle(updateReq).pipe(
        tap({
          next: success => { },
          error: error => {
            if (error.status == 401) {
              localStorage.removeItem('token');
              this.router.navigate(['/user/login']);


            }
            if (error.status == 403) {
              this.router.navigate(['/forbidden']);
            }
          }
        })
      );


    }

    else {

      return next.handle(request);

    }

  }
}
