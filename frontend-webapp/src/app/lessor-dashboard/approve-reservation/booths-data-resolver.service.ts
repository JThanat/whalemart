import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { map } from 'rxjs/operators';

import { Booth } from './approve-reservation.component';

interface BoothDataServerResponse {
  id: number;
  booth_number: string;
  vendors: {
    id: number;
    first_name: string;
    last_name: string;
    shop_name: string;
    products: {
      id: number;
      name: string;
      description: string;
      image: string;
    }[];
  }[];
}

@Injectable()
export class BoothsDataResolver implements Resolve<Booth[]> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Booth[]> {
    const marketId = route.paramMap.get('id');

    if (marketId === null) {
      return observableThrow(new Error('Market ID is not specified'));
    }

    return this.http
      .get<BoothDataServerResponse[]>(`/api/booths-in-unapproved-market/${marketId}/`)
      .pipe(
        map(serverBooths =>
          serverBooths.map(booth => ({
            id: booth.id,
            name: booth.booth_number,
            vendors: booth.vendors.map(vendor => ({
              id: vendor.id,
              firstName: vendor.first_name,
              lastName: vendor.last_name,
              shopName: vendor.shop_name,
              products: vendor.products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: product.image
              }))
            }))
          }))
        )
      );
  }
}
