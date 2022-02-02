import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iorder } from 'src/app/shared/interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:25942/api/order';


  postOrder(order: Iorder[]) {
    return this.http.post(this.url, order);
  }

}
