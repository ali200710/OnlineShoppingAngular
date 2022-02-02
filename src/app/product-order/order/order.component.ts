import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnChanges {

  orders: any[] = []
  constructor(private orderSer: OrderService) { }

  @Input('productToOrder') productToOrder: any

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.productToOrder) {

      let exist = !!this.orders.find(a => a.id == this.productToOrder.id);
      if (!exist) {
        this.orders.push(this.productToOrder);

      }
      else {
        let index = this.orders.findIndex(a => a.id == this.productToOrder.id);
        this.orders[index].quantity++;
      }


      this.calculateTotalPrice();


    }
  }

  onIncrease(index: number) {
    this.orders[index].quantity++;

    this.calculateTotalPrice();
  }

  onDecrease(index: number) {
    if (this.orders[index].quantity > 1) {
      this.orders[index].quantity--;
      this.calculateTotalPrice();


    }


  }

  calculateTotalPrice() {
    for (let i = 0; i < this.orders.length; i++) {

      this.orders[i].totalPrice = this.orders[i].productPrice * this.orders[i].quantity;

    }
  }

}
