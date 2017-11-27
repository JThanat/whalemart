import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Product } from './market-reserve-booth.component';

interface ProductServerResponse {
  id: number;
  name: string;
  description: string;
  image: string;
}

@Injectable()
export class ProductsResolver implements Resolve<Product[]> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
    return this.http.get<ProductServerResponse[]>(`/api/product/`).pipe(
      map(serverProducts =>
        serverProducts.map(serverProduct => ({
          id: serverProduct.id,
          name: serverProduct.name,
          description: serverProduct.description,
          imageUrl: serverProduct.image
        }))
      )
    );
  }
}
