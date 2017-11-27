import { Component, OnInit } from '@angular/core';
import {
  ReservationInformation,
  VendorReservationService,
  ReservationStatus,
  PaymentStatus
} from './vendor-reservation.service';

@Component({
  selector: 'app-vendor-reservation',
  templateUrl: './vendor-reservation.component.html',
  styleUrls: ['./vendor-reservation.component.scss']
})
export class VendorReservationComponent implements OnInit {
  reservationInfo: ReservationInformation[];

  constructor(private vendorReservationService: VendorReservationService) {}

  ngOnInit() {
    this.vendorReservationService.reservationInformation$.subscribe(
      data => (this.reservationInfo = data)
    );
  }

  reservationToWord(status: ReservationStatus) {
    switch (status) {
      case 'waiting':
        return 'รออนุมัติ';
      case 'approved':
        return 'ผ่าน';
      case 'rejected':
        return 'ไม่ผ่าน';
      case 'cancelled':
        return 'ยกเลิก';
    }
  }

  paymentToWord(status: PaymentStatus) {
    switch (status) {
      case 'draft':
        return 'รออนุมัติ';
      case 'deposited':
        return 'จ่าย 30%';
      case 'fully':
        return 'จ่าย 100%';
    }
  }
}
