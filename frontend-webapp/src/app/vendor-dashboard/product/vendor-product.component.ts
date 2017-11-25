import { Component, OnInit } from '@angular/core';
import { Product, VendorProductService } from './vendor-product.service';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.scss']
})
export class VendorProductComponent implements OnInit {
  products: Product[];

  constructor(private vendorProductService: VendorProductService) {}

  ngOnInit() {
    this.vendorProductService
      .getProducts$()
      .subscribe(data => (this.products = data));
  }
}
