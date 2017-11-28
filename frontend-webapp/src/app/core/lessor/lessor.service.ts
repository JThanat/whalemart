import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map, mapTo } from 'rxjs/operators';

import { Market, MarketServerResponse, MarketService } from '../market/market.service';

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

interface LessorProfileResponse {
  lessor_name: string;
  is_organization: boolean;
  organization_name: string;
  organization_contact_name: string;
  organization_email: string;
  organization_phone_number: string;
  user: number;
}

export interface LessorProfile {
  lessorName: string;
  isOrganization: boolean;
  organizationName: string;
  organizationContactName: string;
  organizationEmail: string;
  organizationPhoneNumber: string;
}

interface LessorProfileRequest {
  lessor_name: string;
  is_organization: boolean;
  organization_name: string;
  organization_contact_name: string;
  organization_email: string;
  organization_phone_number: string;
}

class LessorProfileError {}

export class VendorProfileError {}

export class MarketsError {}

@Injectable()
export class LessorService {
  constructor(private http: HttpClient, private marketService: MarketService) {}

  getUnapprovedMarketList(): Observable<Market[]> {
    return this.http.get<MarketServerResponse[]>('/api/unapproved-markets/').pipe(
      map(markets => {
        return markets.map(market => this.marketService.normalizeMarket(market));
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new MarketsError()) as Observable<Market[]>;
          }
        }
        return observableThrow(err) as Observable<Market[]>;
      })
    );
  }

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

  get getLessorProfile$(): Observable<LessorProfile> {
    return this.http.get<LessorProfileResponse>('/api/lessor/').pipe(
      map(data => {
        return {
          lessorName: data.lessor_name,
          isOrganization: data.is_organization,
          organizationName: data.organization_name,
          organizationContactName: data.organization_contact_name,
          organizationPhoneNumber: data.organization_phone_number,
          organizationEmail: data.organization_email
        };
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new LessorProfileError());
          }
        }
        return observableThrow(err);
      })
    );
  }

  updateLessorProfile$(lessorProfile: LessorProfileRequest) {
    return this.http.post<LessorProfileRequest>('/api/lessor/change/', lessorProfile).pipe(
      mapTo(true),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new LessorProfileError());
          }
        }
        return observableThrow(err);
      })
    );
  }
}
