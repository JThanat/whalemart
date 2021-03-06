import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { first, map, mergeMap } from 'rxjs/operators';

import { AlertService } from '../../core/alert/alert.service';
import { ApproveReservationService } from './approve-reservation.service';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Vendor {
  id: number;
  firstName: string;
  lastName: string;
  shopName: string;
  products: Product[];
}

export interface Booth {
  id: number;
  name: string;
  vendors: Vendor[];
}

@Component({
  selector: 'app-approve-reservation',
  templateUrl: './approve-reservation.component.html',
  styleUrls: ['./approve-reservation.component.scss']
})
export class ApproveReservationComponent implements OnInit {
  boothsData: Observable<Booth[]>;
  selectedBooth: Booth | null = null;
  isProcessing = false;

  /**
   * A map that maps vendor ID to selected booth ID.
   */
  vendorBoothSelectMap = new Map<number, number>();

  /**
   * A map that maps booth ID to selected vendor ID.
   */
  boothVendorSelectMap = new Map<number, number>();

  constructor(
    private route: ActivatedRoute,
    private approveReservationService: ApproveReservationService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.boothsData = this.route.data.pipe(map(data => data.boothsData));
  }

  selectBooth(booth: Booth) {
    this.selectedBooth = booth;
  }

  submitApproval() {
    if (confirm('การกระทำนี้ไม่สามารถยกเลิกได้ คุณแน่ใจหรือไม่ว่าจะอนุมัติ?')) {
      this.isProcessing = true;
      this.route.paramMap
        .pipe(
          first(),
          map(param => param.get('id')),
          mergeMap(marketId => {
            if (marketId === null) {
              throw new Error('Market ID should not be null');
            }
            return this.approveReservationService.approveReservation({
              marketId: Number(marketId),
              boothVendorMap: this.boothVendorSelectMap
            });
          })
        )
        .subscribe(
          () => {
            this.alert.show({ message: 'การอนุมัติสำเร็จ', type: 'success' });
            this.router.navigate(['/lessor']);
          },
          () => {
            // TODO: Properly handle error.
            this.alert.show({ message: 'การอนุมัติไม่สำเร็จ', type: 'danger' });
          }
        );
    }
  }

  hasSelectedVendor(booth: Booth) {
    return this.boothVendorSelectMap.has(booth.id);
  }

  getSelectingBoothId(vendor: Vendor) {
    return this.vendorBoothSelectMap.get(vendor.id);
  }

  getSelectingBooth(vendor: Vendor) {
    return this.boothsData.pipe(
      map(booths => booths.find(booth => booth.id === this.vendorBoothSelectMap.get(vendor.id)))
    );
  }

  isSelectingSelectedBooth(vendor: Vendor) {
    return this.selectedBooth && this.getSelectingBoothId(vendor) === this.selectedBooth.id;
  }

  isSelectingAnotherBooth(vendor: Vendor) {
    const boothId = this.getSelectingBoothId(vendor);
    return this.selectedBooth && boothId !== this.selectedBooth.id && boothId !== undefined;
  }

  selectVendorBooth(vendor: Vendor, booth: Booth) {
    if (this.isProcessing) {
      return;
    }

    const vendorId = vendor.id;
    const boothId = booth.id;

    // Ensure that the booth select no one.
    const deletingVendorId = this.boothVendorSelectMap.get(boothId);
    if (deletingVendorId !== undefined) {
      this.boothVendorSelectMap.delete(boothId);
      this.vendorBoothSelectMap.delete(deletingVendorId);
    }

    // Ensure that the vendor does not select any booth.
    const deletingBoothId = this.vendorBoothSelectMap.get(vendorId);
    if (deletingBoothId !== undefined) {
      this.vendorBoothSelectMap.delete(vendorId);
      this.boothVendorSelectMap.delete(deletingBoothId);
    }

    this.vendorBoothSelectMap.set(vendorId, boothId);
    this.boothVendorSelectMap.set(boothId, vendorId);
  }
}
