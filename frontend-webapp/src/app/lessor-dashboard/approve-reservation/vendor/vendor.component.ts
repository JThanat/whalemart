import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Vendor } from '../approve-reservation.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent {
  @Input() vendor: Vendor;
  @Input() selected = false;
  @Input() note = '';
  @Output() select = new EventEmitter();

  selectedProduct = 0;

  selectVendor() {
    this.select.next();
  }
}
