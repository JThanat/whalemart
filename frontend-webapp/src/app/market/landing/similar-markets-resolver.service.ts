import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs/operators';

import { Market, MarketServerResponse, MarketService } from '../../core/market/market.service';

@Injectable()
export class SimilarMarketsResolver implements Resolve<Market[]> {
  constructor(private http: HttpClient, private marketService: MarketService) {}

  resolve(route: ActivatedRouteSnapshot) {
    // TODO: Send market ID with the API.
    // const marketId = route.paramMap.get('id');

    return this.http
      .get<{ results: MarketServerResponse[] }>('/api/similar-market/')
      .pipe(
        map(res =>
          res.results.map(serverMarket => this.marketService.normalizeMarket(serverMarket))
        )
      );
  }
}
