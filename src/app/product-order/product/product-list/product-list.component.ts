import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CheckRolesService } from 'src/app/core/helper/check-roles.service';
import { ProductService } from 'src/app/core/services/product.service';
import { IproductList } from 'src/app/shared/interfaces/iproductList';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  constructor(private productSer: ProductService,
    private router: Router,
    private checkTokenRoles: CheckRolesService) { }

  isAdmin = false;
  subscripeToken!: Subscription
  confirmDelete = false;
  indexDeleted = -1;
  url = 'http://localhost:25942/images/'
  products!: IproductList[]
  product: any
  ngOnInit(): void {

    this.checkTokenRoles.setcheckToken();
    this.subscripeToken = this.checkTokenRoles.getCheckToken().subscribe({ next: s => { this.isAdmin = s } })
    this.productSer.getAll().subscribe(
      {

        next: (s: any) => { this.products = s },
        error: e => { console.log(e) }
      }
    );


  }

  onDelete(id: number) {
    this.productSer.deleteImage(id).subscribe({
      next: s => {
        this.productSer.deleteProduct(id).subscribe({
          next: s => {
            this.confirmDelete = false;

          },
          error: e => { }
        });

      },
      error: e => { }
    });
  }


  addToCart(id: number) {

    let obj = this.products.find(a => a.id == id);

    this.product = { productName: obj?.productName, productPrice: obj?.productPrice, id: obj?.id, quantity: 1, totalPrice: obj?.productPrice };
  }

  ngOnDestroy(): void {
    this.subscripeToken.unsubscribe();
  }

}
