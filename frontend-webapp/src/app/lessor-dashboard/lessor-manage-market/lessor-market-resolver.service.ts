import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Market } from '../../core/market/market.service';
import { LessorService } from '../lessor.service';

@Injectable()
export class LessorMarketResolverService {

  constructor(private lessorService: LessorService) { }

  resolve(): Observable< Market[] > {
    return this.lessorService.getMarketList();
  }

}
