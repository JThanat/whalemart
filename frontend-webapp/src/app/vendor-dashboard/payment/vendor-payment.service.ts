import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map, mergeMap } from 'rxjs/operators';

export type CreditCardType = 'visa' | 'master';

export interface CreditCard {
  id: number;
  cardNumber: string;
  cardHolderName: string;
  verificationNo: string;
  type: CreditCardType;
  expiryDate: Date;
}

export interface CreditCardResponse {
  card_number: string;
  card_holder_name: string;
  type: number;
  expiry_date: string;
}

export interface CreditCardRequest extends CreditCardResponse {
  verification_no: string;
}

export interface CreditCardRequestWithID extends CreditCardRequest {
  id: number;
}

class CreditCardError {}

@Injectable()
export class VendorPaymentService {
  constructor(private http: HttpClient) {}

  get creditCardError() {
    return catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status >= 400 && err.status < 500) {
          return observableThrow(new CreditCardError());
        }
      }
      return observableThrow(err);
    });
  }

  get getCreditCards$(): Observable<CreditCard> {
    return this.http
      .get<{ results: CreditCardResponse[] }>('/api/credit-card/')
      .pipe(
        map(data => {
          return data.results.map(d => {
            return {
              cardNumber: d.card_number,
              cardHolderName: d.card_holder_name,
              type: d.type === 1 ? 'master' : 'visa',
              expiryDate: new Date(d.expiry_date)
            };
          });
        }),
        this.creditCardError
      );
  }

  deleteCreditCard$(id: number) {
    return this.http
      .delete(`/api/credit-card/${id}/`)
      .pipe(mergeMap(() => this.getCreditCards$), this.creditCardError);
  }

  addCreditCard$(creditCard: CreditCardRequest) {
    return this.http
      .post<CreditCardRequest>('/api/credit-card/', creditCard)
      .pipe(mergeMap(() => this.getCreditCards$), this.creditCardError);
  }
}
