import { Injectable } from '@angular/core';;
import { LessorService, MarketList } from '../lessor.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LessorMarketResolverService {

  constructor(private lessorService: LessorService) { }

  resolve(): Observable<MarketList> {
    return this.lessorService.getMarketList();
  }

}
