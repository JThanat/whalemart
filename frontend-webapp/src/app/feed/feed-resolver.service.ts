import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MarketFeed, MarketService } from '../core/market/market.service';

@Injectable()
export class FeedResolver implements Resolve<MarketFeed> {
  constructor(private marketService: MarketService) {}

  resolve(): Observable<MarketFeed>  {
    return this.marketService.getFeed();
  }
}
