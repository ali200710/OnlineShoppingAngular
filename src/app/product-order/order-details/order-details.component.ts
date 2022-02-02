import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CheckUserService } from 'src/app/core/helper/check-user.service';
import { OrderDetailsService } from 'src/app/core/services/order-details.service';
import { OrderService } from 'src/app/core/services/order.service';
import { Iorder } from 'src/app/shared/interfaces/iorder';
import { IorderDetails } from 'src/app/shared/interfaces/iorder-details';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, DoCheck, OnDestroy {

  constructor(private orderDetailsSer: OrderDetailsService,
    private orderSer: OrderService,
    private checkUserSer: CheckUserService,
    private router: Router) { }

  @Input('orderDetailsFormorder') orderDetails!: any[];
  totalPriceForAll!: number;

  userSubscripe$!: Subscription;
  userId!: string
  ngOnInit(): void {

    this.userSubscripe$ = this.checkUserSer.getToken().subscribe({
      next: (s: any) => {
        this.userId = s;
      }
    });

    this.checkUserSer.setToken();
  }



  ngDoCheck(): void {
    this.totalPriceForAll = this.calculateTotalPrice();

  }


  calculateTotalPrice() {
    let total = 0;
    for (let i = 0; i < this.orderDetails.length; i++) {

      total = total + this.orderDetails[i].totalPrice;


    }


    return total;

  }



  onSubmit() {

    console.log(this.orderDetails)

    let orderList: Iorder[] = [];
    let orderDetailsList: any[] = [];
    let orderObj: Iorder;
    let orderDetailsObj: any;

    let date = new Date();
    for (let i = 0; i < this.orderDetails.length; i++) {

      orderObj = { productId: this.orderDetails[i].id, userId: this.userId, orderDate: date };
      orderDetailsObj = {
        productId: this.orderDetails[i].id,
        quantity: this.orderDetails[i].quantity,
        totalPrice: this.orderDetails[i].totalPrice,

      };
      orderList.push(orderObj);
      orderDetailsList.push(orderDetailsObj);


    }

    this.orderSer.postOrder(orderList).subscribe({
      next: (data: any) => {
        console.log('d');

        for (let i = 0; i < data.length; i++) {
          orderDetailsList[i] = { orderId: data[i].id, ...orderDetailsList[i] }
        }
        console.log(orderDetailsList);

        this.orderDetailsSer.postOrderDetails(orderDetailsList).subscribe({
          next: s => {
            this.router.navigate(['/home'], { queryParams: { purchase: 'done' } });
          }
        });
      },
      error: e => { }
    });

  }

  ngOnDestroy(): void {
    this.userSubscripe$.unsubscribe();
  }

}
