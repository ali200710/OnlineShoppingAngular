import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IorderDetails } from 'src/app/shared/interfaces/iorder-details';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:25942/api/OrderDetails';


  postOrderDetails(orderDetails: IorderDetails[]) {
    return this.http.post(this.url, orderDetails);
  }
}
