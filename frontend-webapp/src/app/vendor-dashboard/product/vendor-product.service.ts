import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, mergeMap } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface ProductRequest {
  name: string;
  description: string;
  image: File;
}

class VendorProductError {}

@Injectable()
export class VendorProductService {
  constructor(private http: HttpClient) {}

  get productError() {
    return catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status >= 400 && err.status < 500) {
          return observableThrow(new VendorProductError());
        }
      }
      return observableThrow(err);
    });
  }

  get getProducts$() {
    return this.http.get<Product[]>('/api/product/').pipe(this.productError);
  }

  addProduct$(product: ProductRequest) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('image', product.image);

    return this.http
      .post<ProductRequest>('/api/product/', formData)
      .pipe(mergeMap(() => this.getProducts$), this.productError);
  }

  deleteProduct$(id: number) {
    return this.http
      .delete(`/api/product/${id}/`, { responseType: 'text' })
      .pipe(mergeMap(() => this.getProducts$), this.productError);
  }
}
