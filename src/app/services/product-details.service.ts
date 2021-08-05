import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  baseURL = environment.apiBaseURL;
  constructor(private http: HttpClient) { }



  fetchProductList(id?: number) {
    return id ? this.http.get<Array<Product>>(`${this.baseURL}products/${id}`) : this.http.get<Array<Product>>(`${this.baseURL}products`);
    // return this.http.get<Array<Product>>(`${this.baseURL}products`);
  }

  addProduct(product: Product) {
    return this.http.post(`${this.baseURL}products`, product);
  }

  updateProduct(product: Product) {
    return this.http.put(`${this.baseURL}products/${product.id}`, product);
  }

  removeProduct(productId: number) {
    return this.http.delete(`${this.baseURL}products/${productId}`,);
  }
}
