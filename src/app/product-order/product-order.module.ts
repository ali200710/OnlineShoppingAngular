import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductOrderRoutingModule } from './product-order-routing.module';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateUpdateComponent } from './product/product-create-update/product-create-update.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCreateUpdateComponent,
    OrderComponent,
    OrderDetailsComponent
  ],
  imports: [
    SharedModule,
    ProductOrderRoutingModule
  ]
})
export class ProductOrderModule { }
