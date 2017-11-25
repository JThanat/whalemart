import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

export interface Product {
  name: string;
  description: string;
  image: string;
  user: number;
}

class VendorProductError { }

@Injectable()
export class VendorProductService {
  constructor(private http: HttpClient) {}

  getProducts$() {
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
}
