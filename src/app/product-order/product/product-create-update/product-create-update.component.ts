import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Iproduct } from 'src/app/shared/interfaces/iproduct';
import { IproductList } from 'src/app/shared/interfaces/iproductList';

@Component({
  selector: 'app-product-create-update',
  templateUrl: './product-create-update.component.html',
  styleUrls: ['./product-create-update.component.css']
})
export class ProductCreateUpdateComponent implements OnInit {

  get productName() {
    return this.productForm.get('productName');
  }
  get productPrice() {
    return this.productForm.get('productPrice');
  }
  get imgUrl() {
    return this.productForm.get('imgUrl');
  }

  productId!: any
  file!: File;
  constructor(private fb: FormBuilder, private productSer: ProductService,
    private route: ActivatedRoute, private router: Router) { }

  productForm!: FormGroup
  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      imgUrl: [null, [Validators.required]],

    });


    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productSer.getById(this.productId).subscribe({

        next: (s: any) => {

          this.productForm.patchValue({
            productName: s.productName,
            productPrice: s.productPrice
          });

          // let f = `http://localhost:25942/images/${s.imgUrl}`;
          // console.log(f)
          // this.productForm.patchValue({

          //   imgUrl: this.onChangeFile(f)
          // })

        },
        error: e => { }

      });
    }


  }

  onChangeFile(event: any) {
    this.file = event.target.files[0];
  }




  onSubmit() {

    let formData = new FormData();
    formData.append("photo", this.file, this.file.name);

    let productObj: Iproduct = { productName: this.productName?.value, productPrice: this.productPrice?.value };

    if (this.productId) {
      this.productSer.putImage(this.productId, formData).subscribe({
        next: s => {
          this.productSer.putProduct(this.productId, productObj).subscribe({
            next: s => {
              this.router.navigate(['/product']);
            },
            error: e => { }
          });
        },
        error: e => { }
      });
    }
    else {


      this.productSer.postProduct(productObj).subscribe({
        next: (s: any) => {
          console.log(s);
          this.productSer.postImage(s.id, formData).subscribe({
            next: s => {
              this.router.navigate(['/product']);

            },
            error: e => { }
          });
        },
        error: e => { }
      });

    }


  }

}
