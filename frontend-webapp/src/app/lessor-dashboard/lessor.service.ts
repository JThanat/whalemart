import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

import { Market, MarketServerResponse, MarketService } from '../core/market/market.service';

export interface MarketList {
  upcomingMarkets: Market[];
  passedMarkets: Market[];
}

export interface LessorResponse {
  id: number;
  lessor_name: string;
  is_organization: boolean;
  organization_name: string;
  organization_contact_name: string;
  organization_email: string;
  organization_phone_number: string;
  user: string;
  markets: MarketServerResponse[];
}

export interface LessorProfile {
  lessor_name: string;
  is_organization: boolean;
  organization_name: string;
  organization_contact_name: string;
  organization_email: string;
  organization_phone_number: string;
  user: string;
}

export class VendorProfileError {}

export class MarketsError {}

@Injectable()
export class LessorService {
  constructor(private http: HttpClient, private marketService: MarketService) {}

  getMarketList(): Observable<MarketList> {
    return this.http.get<LessorResponse>('/api/lessor/').pipe(
      map(data => {
        const normalizedMarkets = data.markets.map(market =>
          this.marketService.normalizeMarket(market)
        );
        const nowDate = new Date();

        return {
          upcomingMarkets: normalizedMarkets.filter(market => market.startDate > nowDate),
          passedMarkets: normalizedMarkets.filter(market => market.startDate <= nowDate)
        };
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new MarketsError()) as Observable<MarketList>;
          }
        }
        return observableThrow(err) as Observable<MarketList>;
      })
    );
  }
}
