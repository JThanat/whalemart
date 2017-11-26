import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

export interface Receipt {
  id: number;
  payment_date: string;
  amount: number;
  verification_status: number;
  receipt_image: string;
}

interface ReceiptServerResponse {
  count: number;
  next: string;
  previous: string;
  results: Receipt[];
}

export class ReceiptError {}

@Injectable()
export class ReceiptService {
  constructor(private http: HttpClient) {}

  verifyReceipt(id: number, verificationStatus: 'accept' | 'reject') {
    return this.http.patch(`/api/verify-receipt/${id}/`, {
      verification_status: verificationStatus === 'accept' ? 2 : 3
    });
  }

  getReceiptList(): Observable<Receipt[]> {
    return this.http.get<ReceiptServerResponse>('/api/verify-receipt/').pipe(
      map(data => {
        return data.results;
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 400 && err.status < 500) {
            return observableThrow(new ReceiptError()) as Observable<Receipt[]>;
          }
        }
        return observableThrow(err) as Observable<Receipt[]>;
      })
    );
  }
}
