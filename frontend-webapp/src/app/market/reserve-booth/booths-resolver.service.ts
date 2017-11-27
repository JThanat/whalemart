import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Booth } from './market-reserve-booth.component';

interface BoothServerResponse {
  id: number;
  booth_number: string;
  rental_fee: string;
}

@Injectable()
export class BoothsResolver implements Resolve<Booth[]> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Booth[]> {
    const marketId = route.paramMap.get('id');

    return this.http.get<BoothServerResponse[]>(`/api/booth/${marketId}/`).pipe(
      map(serverBooths =>
        serverBooths.map(serverBooth => ({
          id: serverBooth.id,
          name: serverBooth.booth_number,
          price: Number(serverBooth.rental_fee)
        }))
      )
    );
  }
}
