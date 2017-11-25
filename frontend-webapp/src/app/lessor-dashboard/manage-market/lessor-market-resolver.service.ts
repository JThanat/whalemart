import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LessorService, MarketList } from '../lessor.service';

@Injectable()
export class LessorMarketResolverService {
  constructor(private lessorService: LessorService) {}

  resolve(): Observable<MarketList> {
    return this.lessorService.getMarketList();
  }
}
