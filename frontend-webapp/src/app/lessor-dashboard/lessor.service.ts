import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map} from 'rxjs/operators';
import { Market, MarketServerResponse, MarketService } from '../core/market/market.service';


export interface MarketList {
  upcoming_markets: Market[];
  passed_markets: Market[];
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

  constructor(private http: HttpClient, private marketService: MarketService) { }

  getMarketList() {
    return this.http.get<LessorResponse>('/api/lessor/').pipe(
      map(data => {
        return {
          upcoming_markets: (data.markets.map(market => this.marketService.normalizeMarket(market)))
          .filter(market => market.startDate > new Date()),
          passed_markets: (data.markets.map(market => this.marketService.normalizeMarket(market)))
          .filter(market => market.startDate < new Date())
        };
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new MarketsError());
          }
        }
        return observableThrow(err);
      })
    );
  }
}
