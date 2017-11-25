import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, mergeMap } from 'rxjs/operators';

export interface Product {
  name: string;
  description: string;
  image: string;
}

interface ProductRequest {
  name: string;
  description: string;
  image: File;
}

class VendorProductError { }

@Injectable()
export class VendorProductService {
  constructor(private http: HttpClient) {}

  get getProducts$() {
    return this.http.get<Product[]>('/api/product/').pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new VendorProductError());
          }
        }
        return observableThrow(err);
      })
    );
  }

  addProduct$(product: ProductRequest) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('image', product.image);

    return this.http.post<ProductRequest>('/api/product/', formData).pipe(
      mergeMap(() => this.getProducts$),
      catchError((err: any) => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new VendorProductError());
          }
        }
        return observableThrow(err);
      })
    );
  }
}
