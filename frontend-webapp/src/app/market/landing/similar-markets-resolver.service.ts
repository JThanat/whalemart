import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Market } from '../../core/market/market.service';

@Injectable()
export class SimilarMarketsResolver implements Resolve<Market[]> {
  resolve(route: ActivatedRouteSnapshot) {
    const marketId = route.paramMap.get('id');

    const testMarket = {
      id: 1,
      imageURL: 'https://url' + marketId,
      expireDay: 3,
      name: 'foo',
      startDate: new Date(),
      endDate: new Date(),
      location: 'bar',
      minPrice: 1200
    };

    return [testMarket, testMarket, testMarket, testMarket];
  }
}
