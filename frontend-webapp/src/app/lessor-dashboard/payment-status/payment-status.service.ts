import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

export interface MarketPaymentStatus {
  report_content: string;
  time_stamp: Date;
  reported_user: string;
  market: string;
}

interface MarketPaymentStatusResponse {
  count: number;
  next: string;
  previous: string;
  results: MarketPaymentStatus[];
}

export class MarketPaymentStatusError {}

@Injectable()
export class PaymentStatusService {
  constructor(private http: HttpClient) { }

  getMarketPaymentStatus(): Observable<MarketPaymentStatus[]> {
    return this.http.get<MarketPaymentStatusResponse>('/api/report/').pipe(
      map(data => data.results),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new MarketPaymentStatusError()) as
              Observable<MarketPaymentStatus[]>;
          }
        }
        return observableThrow(err) as Observable<MarketPaymentStatus[]>;
      })
    );
  }
}
