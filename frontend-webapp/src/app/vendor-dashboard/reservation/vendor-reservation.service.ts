import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs/observable/of';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

export type ReservationStatus = 'waiting' | 'approved' | 'rejected' | 'cancelled';
export type PaymentStatus = 'draft' | 'deposited' | 'fully' | null;

export interface ReservationInformation {
  marketID: number;
  reservationStatus: ReservationStatus;
  approvedBooth: number | null;
  boothRentalFee: number | null;
  paymentStatus: PaymentStatus;
  incompleteInstallmentID: number | null;
}

export interface ReservationInformationResponse {
  market_id: number;
  reservation_status: number;
  approved_booth: number | null;
  booth_rental_fee: number | null;
  payment_status: number | null;
  incomplete_installment_id: number | null;
}

class ReservationInformationError {}

@Injectable()
export class VendorReservationService {
  transformToReservationInformation(
    data: ReservationInformationResponse
  ): ReservationInformation {
    let reservationStatus: ReservationStatus = 'waiting';
    switch (data.reservation_status) {
      case 0:
        reservationStatus = 'waiting';
        break;
      case 1:
        reservationStatus = 'approved';
        break;
      case 2:
        reservationStatus = 'rejected';
        break;
      case 3:
        reservationStatus = 'cancelled';
        break;
    }
    let paymentStatus: PaymentStatus = null;
    switch (data.payment_status) {
      case 0:
        paymentStatus = 'draft';
        break;
      case 1:
        paymentStatus = 'deposited';
        break;
      case 2:
        paymentStatus = 'fully';
        break;
    }
    return {
      marketID: data.market_id,
      reservationStatus,
      approvedBooth: data.approved_booth,
      boothRentalFee: data.booth_rental_fee,
      paymentStatus,
      incompleteInstallmentID: data.incomplete_installment_id
    };
  }

  get reservationInformationError() {
    return catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status >= 400 && err.status < 500) {
          return observableThrow(new ReservationInformationError());
        }
      }
      return observableThrow(err);
    });
  }

  get reservationInformation$() {
    return observableOf([
      {
        market_id: 1,
        reservation_status: 1,
        approved_booth: 1,
        booth_rental_fee: 1700.0,
        payment_status: null,
        incomplete_installment_id: null
      },
      {
        market_id: 2,
        reservation_status: 0,
        approved_booth: null,
        booth_rental_fee: null,
        payment_status: null,
        incomplete_installment_id: null
      },
      {
        market_id: 4,
        reservation_status: 1,
        approved_booth: 296,
        booth_rental_fee: 3300.0,
        payment_status: 0,
        incomplete_installment_id: 1
      }
    ]).pipe(
      map((req: ReservationInformationResponse[]) =>
        req.map(x => this.transformToReservationInformation(x))
      ),
      this.reservationInformationError
    );
  }
}
