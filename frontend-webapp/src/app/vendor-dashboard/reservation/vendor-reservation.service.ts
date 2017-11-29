import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _throw as observableThrow } from 'rxjs/observable/throw';
import { catchError, map } from 'rxjs/operators';

export type ReservationStatus =
  | 'waiting'
  | 'approved'
  | 'rejected'
  | 'cancelled';
export type PaymentStatus = 'draft' | 'deposited' | 'fully' | 'unpaid' | null;

export interface ReservationInformation {
  marketID: number;
  marketName: string;
  reservationStatus: ReservationStatus;
  approvedBooth: number | null;
  boothRentalFee: number | null;
  paymentStatus: PaymentStatus;
  incompleteInstallmentID: number | null;
}

export interface ReservationInformationResponse {
  market_id: number;
  market_name: string;
  reservation_status: number;
  approved_booth: number | null;
  booth_rental_fee: number | null;
  payment_status: number | null;
  incomplete_installment_id: number | null;
}

class ReservationInformationError {}

@Injectable()
export class VendorReservationService {
  constructor(private http: HttpClient) {}

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
    if (reservationStatus === 'approved' && paymentStatus == null) {
      paymentStatus = 'unpaid';
    }
    return {
      marketID: data.market_id,
      marketName: data.market_name,
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

  reservationInformation$() {
    return this.http.get<ReservationInformationResponse[]>('/api/reservation-status/')
      .pipe(
        map(req => req.map(x => this.transformToReservationInformation(x))),
        this.reservationInformationError
      );
  }
}
