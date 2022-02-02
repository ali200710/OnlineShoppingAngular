import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from 'src/app/shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:25942/api/product';

  getAll() {
    return this.http.get(this.url);
  }

  getById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  postProduct(product: Iproduct) {
    return this.http.post(this.url, product);
  }

  postImage(id: number, photo: FormData) {
    return this.http.post(`${this.url}/addImage/${id}`, photo, {
    });
  }


  putProduct(id: number, product: Iproduct) {
    return this.http.put(`${this.url}/${id}`, product);
  }

  putImage(id: number, photo: FormData) {
    return this.http.put(`${this.url}/editImage/${id}`, photo, {

    });
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  deleteImage(id: number) {
    return this.http.delete(`${this.url}/deleteImage/${id}`);
  }




}
