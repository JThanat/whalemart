import { Component, OnInit } from '@angular/core';
import { ReservationInformation, VendorReservationService } from './vendor-reservation.service';

@Component({
  selector: 'app-vendor-reservation',
  templateUrl: './vendor-reservation.component.html',
  styleUrls: ['./vendor-reservation.component.scss']
})
export class VendorReservationComponent implements OnInit {
  reservationInformation: ReservationInformation[];

  constructor(
    private vendorReservationService: VendorReservationService
  ) { }

  ngOnInit() {
    this.vendorReservationService.reservationInformation$.subscribe(
      data => this.reservationInformation = data
    );
  }

}
