import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { combineLatest as observableCombineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { LessorService, MarketList } from '../../core/lessor/lessor.service';
import { Market } from '../../core/market/market.service';

@Injectable()
export class LessorMarketResolverService {
  constructor(private lessorService: LessorService) {}

  resolve(): Observable<{ unapproved: Market[]; all: MarketList }> {
    return observableCombineLatest(
      this.lessorService.getUnapprovedMarketList(),
      this.lessorService.getMarketList()
    ).pipe(map(([unapproved, all]) => ({ unapproved, all })));
  }
}
